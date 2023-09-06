# -*- coding: utf-8 -*-
# 
from os.path import  join, dirname
import re
import aqt
from anki.hooks import addHook, wrap
from aqt import mw
import anki.find
from aqt.qt import QAction
from aqt.utils import showInfo, shortcut
from aqt.qt import *
import json
from . import Pyperclip
from datetime import datetime
from aqt.browser import DataModel
import time
from anki.sched import Scheduler
import anki.schedv2
import math
from .miutils import miInfo, miAsk
import anki.find
import json
from .accentExporter import AccentDictionaryParser
import requests 
from .submitMenu import SubmitGui
from .discordAuth import MIADiscordAuth


class TrialUploader:
    def __init__(self):
        self.mw = mw
        self.path = dirname(__file__)
        self.find = anki.find
        self.dictParser = AccentDictionaryParser(mw)
        self.dateStamp = False
        self.POST_ENDPOINT = "https://trials.massimmersionapproach.com/api/experiments/mia-community-census/surveys/d9u5dvc74s5arz0hqe634a/responses"
        self.startingIntervals = {'110': [0, 10], '1120': [10, 21], '2130': [20, 31], '3145': [30, 46], '4665': [45, 66], '6690': [65, 91], '91120': [90, 121], '121150': [120, 151]}
        self.generalTotals = [
                        ['FirstFails*',  0],
                        ['TotalReps',  0],
                        ['TotalReviewReps',  0],
                        ['TotalNewReps',  0],
                        ['TotalCorrect*',  0],
                        ['TotalReviewCorrect*',  0],
                        ['TotalNewCorrect*',  0],
                        ['TotalTime',  0],
                        ['TotalReviewTime',  0],
                        ['TotalNewTime',  0],
                        ['TotalCards',  0],
                        ['Leeches', 0],
                        ['110Reps', 0],
                        ['1120Reps', 0],
                        ['2130Reps', 0],
                        ['3145Reps', 0],
                        ['4665Reps', 0],
                        ['6690Reps', 0],
                        ['91120Reps', 0],
                        ['121150Reps', 0],
                        ['110Correct*', 0],
                        ['1120Correct*', 0],
                        ['2130Correct*', 0],
                        ['3145Correct*', 0],
                        ['4665Correct*', 0],
                        ['6690Correct*', 0],
                        ['91120Correct*', 0],
                        ['121150Correct*', 0],
                        ['110Fails*', 0],
                        ['1120Fails*', 0],
                        ['2130Fails*', 0],
                        ['3145Fails*', 0],
                        ['4665Fails*', 0],
                        ['6690Fails*', 0],
                        ['91120Fails*', 0],
                        ['121150Fails*', 0]
                        ]

        self.noCharTotals = [
                        ['KnownWordsCombined*', {}],
                        ['KnownWordsFront*',  {}],
                        ['KnownWordsBack*', {}]
                        ]

    def submitTrial(self):
        self.loopCol()

    def openSubmitGui(self, cookies, userName):
        self.cookies = cookies
        self.menu = SubmitGui(self.mw, self.path, self, userName)

    def openLogin(self):
        self.discordAuth = MIADiscordAuth(self, self.path)

    def grabLearning(self):
        return self.find.Finder(self.mw.col).findCards('is:learn', order= '  c.reps  ')

    def grabReviews(self):
        return self.find.Finder(self.mw.col).findCards('is:review', order= ' c.ivl ')    

    def getRepInfo(self, cid):

        last = self.mw.col.db.all(
                "select id, ease, ivl, lastIvl, time, type, factor from revlog where cid = ? "
                "order by id desc", cid)

        if last:
            # Pyperclip.copy(cid)
            # miInfo(str(last))
            return last
        else:
            return []

    def percentageCalc(self, dividend, divisor):
        if divisor == 0:
            return None
        return round(dividend/divisor * 100, 3)

    def timeCalc(self, dividend, divisor):
        if divisor == 0:
            return None
        return round((dividend/divisor)/1000, 3)

    def roundTotalTime(self, totalTime):
        return round((totalTime)/1000, 3)


    def getFrequencyList(self):
        import codecs
        freqFile = join(dirname(__file__), "frequency.json" )
        return json.load((codecs.open(freqFile, 'r', 'utf-8-sig')))

    def getRetentionRate(self, reps):
        revReps = 0
        correct = 0
        for rep in reps:
            if rep[5] != 0:
                revReps += 1
                if rep[1] > 1:
                    correct+= 1

        return self.percentageCalc(correct, revReps) 
       
    def getLearningRate(self, reps):
        learnReps = 0
        correct = 0
        for rep in reps:
            if rep[5] == 0:
                learnReps += 1
                if rep[1] > 1:
                    correct+= 1   

        return self.percentageCalc(correct, learnReps) 
        

    def getNewFails(self, reps):
        fails = 0
        for rep in reps:
            if rep[5] == 0:
                if rep[1] == 1:
                    fails += 1
        return fails

    def getRevFails(self, reps):
        fails = 0
        for rep in reps:
            if rep[5] != 0:
                if rep[1] == 1:
                    fails += 1
        return fails

    def getRevReps(self, reps):
        revReps = 0
        for rep in reps:
            if rep[5] != 0:
                revReps += 1
        return revReps

    def getNewReps(self, reps):
        newReps = 0
        for rep in reps:
            if rep[5] == 0:
                newReps += 1
        return newReps

    def getAverageRevTime(self, reps):
        revReps = 0
        totTime = 0
        for rep in reps:
            if rep[5] != 0:
                revReps += 1
                totTime += rep[4]

        return self.timeCalc(totTime, revReps)
        
    def getAverageNewTime(self, reps):
        newReps = 0
        totTime = 0
        for rep in reps:
            if rep[5] == 0:
                newReps += 1
                totTime += rep[4]

        return self.timeCalc(totTime, newReps)

            
    def getTotalAverageTime(self, reps):
        allReps = 0
        totTime = 0
        for rep in reps:
                allReps += 1
                totTime += rep[4]

        return self.timeCalc(totTime, allReps)
        

    def adjustedIvl(self, ivl):
        if ivl < 0:
            return 0
        return ivl

    def getTotalReviewTime(self, reps):
        totTime = 0
        for rep in reps:
                totTime += rep[4]
        return round((totTime/ 1000), 3)
       
    def incrementTotalCorrectReps(self, reps, totals, instruction, noChar):
        correct = 0
        totalReps = 0
        revCorrect = 0
        revTotalReps = 0
        newCorrect = 0
        newTotalReps = 0
        for rep in reps:
            totalReps += 1
            if rep[5] != 0:
                revTotalReps += 1
                if rep[1] > 1:
                    revCorrect += 1
                    correct+= 1
            else:
                newTotalReps += 1
                if rep[1] > 1:
                    newCorrect += 1
                    correct+= 1
        if noChar:
            totals = self.incrementRepsCorrects('noChar', totals, totalReps, revTotalReps, newTotalReps, correct, revCorrect, newCorrect)
        else:
            totals = self.incrementRepsCorrects('char', totals, totalReps, revTotalReps, newTotalReps, correct, revCorrect, newCorrect)
        totals = self.incrementRepsCorrects(instruction, totals, totalReps, revTotalReps, newTotalReps, correct, revCorrect, newCorrect)
        totals = self.incrementRepsCorrects('col', totals, totalReps, revTotalReps, newTotalReps, correct, revCorrect, newCorrect)
        return totals


    def incrementRepsCorrects(self, target, totals, totalReps, revTotalReps, newTotalReps, correct, revCorrect, newCorrect):
        totals[target + 'TotalReps'] += totalReps
        totals[target + 'TotalReviewReps'] += revTotalReps
        totals[target + 'TotalNewReps'] += newTotalReps
        totals[target + 'TotalCorrect*'] += correct
        totals[target + 'TotalReviewCorrect*'] += revCorrect
        totals[target + 'TotalNewCorrect*'] += newCorrect
        return totals
                      

    def updateTimes(self, reps, totals, instruction, noChar):
        totalTime = 0
        totalTimeRevs = 0
        totalTimeNews = 0
        for rep in reps:
            totalTime += rep[4]
            if rep[5] != 0:
                totalTimeRevs += rep[4]
            else:
                totalTimeNews += rep[4]
        if noChar:
            totals = self.incrementTotalTimes('noChar', totals, totalTime, totalTimeRevs, totalTimeNews)
        else:
            totals = self.incrementTotalTimes('char', totals, totalTime, totalTimeRevs, totalTimeNews)
        totals = self.incrementTotalTimes(instruction, totals, totalTime, totalTimeRevs, totalTimeNews)
        totals = self.incrementTotalTimes('col', totals, totalTime, totalTimeRevs, totalTimeNews)
        return totals


    def incrementTotalTimes(self, target, totals, totalTime, totalTimeRevs, totalTimeNews):
        totals[target + 'TotalTime'] += totalTime
        totals[target + 'TotalReviewTime'] += totalTimeRevs
        totals[target + 'TotalNewTime'] += totalTimeNews
        return totals

    def incrementIntervalCorrectsReps(self, reps, totals, instruction, noChar):
        prefix = 'char'
        if noChar:
            prefix = 'noChar'
        for rep in reps:
            if rep[5] != 0:
                totals, found = self.addStartingRepCorrectIntervals(instruction, rep, prefix, totals)
                if not found:
                    totals, found = self.addMonthlyRepCorrectIntervals(instruction, rep, prefix, totals)
                    if not found:
                        totals = self.add751PlusRepCorrectIntervals(instruction, rep, prefix, totals)
        return totals

    def getIntervalPrefix(self, first, second):
        return str(first+ 1) + str(second)

    def add751PlusRepCorrectIntervals(self, instruction, rep, prefix, totals):
        if rep[3] > 750:
            repNames = [instruction + '751PlusReps', prefix + '751PlusReps', 'col751PlusReps']
            totals = self.incrementInTotals(repNames, totals)
            if rep[1] > 1:
                correctNames = [instruction + '751PlusCorrect*', prefix + '751PlusCorrect*', 'col751PlusCorrect*']
                totals = self.incrementInTotals(correctNames, totals)
        return totals

    def addMonthlyRepCorrectIntervals(self, instruction, rep, prefix, totals):
        found = False
        first = 150
        second = first
        for i in range(1, 21):
            if i > 1:
                first = second
            second += 30
            ivlPrefix = self.getIntervalPrefix(first, second)
            if rep[3] > first and rep[3] < second + 1:
                repNames = [instruction + ivlPrefix + 'Reps', prefix + ivlPrefix + 'Reps', 'col' + ivlPrefix + 'Reps']
                totals = self.incrementInTotals(repNames, totals)
                if rep[1] > 1:
                    correctNames = [instruction + ivlPrefix + 'Correct*', prefix + ivlPrefix + 'Correct*', 'col' + ivlPrefix + 'Correct*']
                    totals = self.incrementInTotals(correctNames, totals)
                found = True
                break
        return totals, found

    def incrementInTotals(self, names, totals):
        for n in names:
            totals[n] += 1
        return totals

    def addMonthlyFailsIntervals(self, instruction, rep, prefix, totals):
        found = False
        first = 150
        second = first
        for i in range(1, 21):
            if i > 1:
                first = second
            second += 30
            ivlPrefix = self.getIntervalPrefix(first, second)
            if rep[3] > first and rep[3] < second + 1:
                failNames = [instruction + ivlPrefix + 'Fails*', prefix + ivlPrefix + 'Fails*', 'col'+ ivlPrefix + 'Fails*']
                totals = self.incrementInTotals(failNames, totals)
                found = True
                break
        return totals, found

    def add751PlusFailsIntervals(self, instruction, rep, prefix, totals):
        if rep[3] > 751:
            failNames = [instruction +'751PlusFails*', prefix + '751PlusFails*', 'col751PlusFails*']
            totals = self.incrementInTotals(failNames, totals)
        return totals

    def addStartingRepCorrectIntervals(self, instruction, rep, prefix, totals):
        found = False
        for ivlPrefix, values in self.startingIntervals.items():
            first, second = values
            if rep[3] > first and rep[3] < second + 1:
                repNames = [instruction + ivlPrefix + 'Reps', prefix + ivlPrefix + 'Reps', 'col' + ivlPrefix + 'Reps']
                totals = self.incrementInTotals(repNames, totals)
                if rep[1] > 1:
                    correctNames = [instruction + ivlPrefix + 'Correct*', prefix + ivlPrefix + 'Correct*', 'col' + ivlPrefix + 'Correct*']
                    totals = self.incrementInTotals(correctNames, totals)
                found = True
                break
        return totals, found

    def addStartingFailsIntervals(self, instruction, rep, prefix, totals):
        found = False
        for ivlPrefix, values in self.startingIntervals.items():
            first, second = values
            if rep[3] > first and rep[3] < second + 1:
                failNames = [instruction + ivlPrefix + 'Fails*', prefix + ivlPrefix + 'Fails*', 'col'+ ivlPrefix + 'Fails*']
                totals = self.incrementInTotals(failNames, totals)
                found = True
                break
        return totals, found

    def incrementFirstFails(self, reps, totals, instruction, noChar):
        prefix = 'char'
        if noChar:
            prefix = 'noChar'
        for rep in reversed(reps):
            if rep[5] not in [0, 3]:
                if rep[1] == 1:
                    firstFailNames = [instruction + 'FirstFails*', prefix + 'FirstFails*', 'colFirstFails*']
                    totals = self.incrementInTotals(firstFailNames, totals)
                    totals, found = self.addStartingFailsIntervals(instruction, rep, prefix, totals)
                    if not found:
                        totals, found = self.addMonthlyFailsIntervals(instruction, rep, prefix, totals)
                        if not found:
                            totals = self.add751PlusFailsIntervals(instruction, rep, prefix, totals)
        return totals

    def removeRepsAfterSurveyDate(self, reps):
        return [item for item in reps if item[0]/1000 < self.dateStamp]


    def getStringDeckNoteCardIds(self, did, mid, cid):
        return str(did) + '-' + str(mid) + '-'+ str(cid)

    def getFields(self, template):
        pattern = r'{{([^#^\/]+?)}}'
        matches = re.findall(pattern, template)
        fields = self.getCleanedFieldArray(matches)
        return fields

    def getCleanedFieldArray(self, fields):
        noDupes = []
        for f in fields:
            fieldName = self.getCleanedFieldName(f)
            if fieldName not in noDupes and fieldName not in ['FrontSide', 'Tags']:
                noDupes.append(fieldName)
        return noDupes

    def getCleanedFieldName(self, fn):
        if ':' in fn:
            split = fn.split(':')
            return split[len(split)-1]
        return fn

    def checkImageAudio(self, fields, note):
        audio = False
        image = False
        imageAudioList = []
        for f in fields:
            if not audio:
                audio = self.checkAudio(note[f])
            if not image:
                image = self.checkImage(note[f])  
        if image:
            imageAudioList.append('Image')
        if audio:
            imageAudioList.append('Audio')
        return imageAudioList

    def checkAudio(self, text):
        if '[sound:' in text:
            return True
        return False

    def checkImage(self, text):
        if '<img' in text:
            return True
        return False

    def addTotalNamesAndInitialize(self, totals, instruction, noChar):
        for gn in self.generalTotals:
            totals[instruction + gn[0]] = gn[1]
        if noChar:
            for ncn in self.noCharTotals:
                totals[instruction + ncn[0]] = ncn[1].copy()
        return totals

    def incrementCardTotals(self, totals, instruction, noChar):
        if noChar:
            totals['noCharTotalCards'] += 1
        else:
            totals['charTotalCards'] += 1
        totals[instruction + 'TotalCards'] += 1
        totals['colTotalCards'] += 1
        return totals

    def addToTotals(self, totals, reps, instruction, noChar, card, note, frontFields, backFields):
        totals = self.incrementIntervalCorrectsReps(reps, totals, instruction, noChar)
        totals = self.incrementFirstFails(reps, totals, instruction, noChar)
        totals = self.incrementCardTotals(totals, instruction, noChar)
        if noChar:
            totals = self.updateKnownWords(totals, instruction, note, frontFields, backFields)
        totals = self.incrementTotalCorrectReps(reps, totals, instruction, noChar)
        totals = self.updateTimes(reps, totals, instruction, noChar)
        totals = self.incrementLeeches(totals, instruction, note, noChar)

    
    def incrementLeeches(self, totals, instruction, note, noChar):
        if note.hasTag('leech'):
            nid = note.id
            if nid not in self.leechNids:
                self.leechNids.append(nid)
                totals['colLeeches'] += 1
                totals[instruction + 'Leeches'] += 1
                if noChar:
                    totals['noCharLeeches'] += 1
                else:
                    totals['charLeeches'] += 1
        return totals
    
    def getBaseTotals(self):
        return {
                'noCharKnownWordsCombined*': {},
                'noCharKnownWordsFront*':  {},
                'noCharKnownWordsBack*':  {},
                'noCharTotalReps':  0,
                'charTotalReps':  0,
                'colTotalReps':  0,
                'noCharTotalCorrect*':  0,
                'charTotalCorrect*':  0,
                'colTotalCorrect*':  0,
                'noCharTotalReviewReps':  0,
                'charTotalReviewReps':  0,
                'colTotalReviewReps':  0,
                'noCharTotalReviewCorrect*':  0,
                'charTotalReviewCorrect*':  0,
                'colTotalReviewCorrect*':  0,
                'noCharTotalNewReps':  0,
                'charTotalNewReps':  0,
                'colTotalNewReps':  0,
                'noCharTotalNewCorrect*':  0,
                'charTotalNewCorrect*':  0,
                'colTotalNewCorrect*':  0,
                'noCharTotalCards':  0,
                'charTotalCards':  0,
                'colTotalCards': 0,
                'colTotalTime': 0,
                'colTotalReviewTime': 0,
                'colTotalNewTime': 0,
                'noCharTotalTime': 0,
                'noCharTotalReviewTime': 0,
                'noCharTotalNewTime': 0,
                'charTotalTime': 0,
                'charTotalReviewTime': 0,
                'charTotalNewTime': 0,
                'colLeeches': 0,
                'noCharLeeches': 0,
                'charLeeches': 0,
                'char110Reps':  0,
                'char1120Reps':  0,
                'char2130Reps':  0,
                'char3145Reps':  0,
                'char4665Reps':  0,
                'char6690Reps':  0,
                'char91120Reps':  0,
                'char121150Reps':  0,
                'char751PlusReps':  0,

                'char110Correct*':  0,
                'char1120Correct*':  0,
                'char2130Correct*':  0,
                'char3145Correct*':  0,
                'char4665Correct*':  0,
                'char6690Correct*':  0,
                'char91120Correct*':  0,
                'char121150Correct*':  0,
                'char751PlusCorrect*':  0,

                'char110Fails*':  0,
                'char1120Fails*':  0,
                'char2130Fails*':  0,
                'char3145Fails*':  0,
                'char4665Fails*':  0,
                'char6690Fails*':  0,
                'char91120Fails*':  0,
                'char121150Fails*':  0,
                'char751PlusFails*':  0,
                'charFirstFails*':  0,

                'noChar110Reps':  0,
                'noChar1120Reps':  0,
                'noChar2130Reps':  0,
                'noChar3145Reps':  0,
                'noChar4665Reps':  0,
                'noChar6690Reps':  0,
                'noChar91120Reps':  0,
                'noChar121150Reps':  0,
                'noChar751PlusReps':  0,

                'noChar110Correct*':  0,
                'noChar1120Correct*':  0,
                'noChar2130Correct*':  0,
                'noChar3145Correct*':  0,
                'noChar4665Correct*':  0,
                'noChar6690Correct*':  0,
                'noChar91120Correct*':  0,
                'noChar121150Correct*':  0,
                'noChar751PlusCorrect*':  0,

                'noChar110Fails*':  0,
                'noChar1120Fails*':  0,
                'noChar2130Fails*':  0,
                'noChar3145Fails*':  0,
                'noChar4665Fails*':  0,
                'noChar6690Fails*':  0,
                'noChar91120Fails*':  0,
                'noChar121150Fails*':  0,
                'noChar751PlusFails*':  0,
                'noCharFirstFails*':  0,

                'col110Reps':  0,
                'col1120Reps':  0,
                'col2130Reps':  0,
                'col3145Reps':  0,
                'col4665Reps':  0,
                'col6690Reps':  0,
                'col91120Reps':  0,
                'col121150Reps':  0,
                'col751PlusReps':  0,

                'col110Correct*':  0,
                'col1120Correct*':  0,
                'col2130Correct*':  0,
                'col3145Correct*':  0,
                'col4665Correct*':  0,
                'col6690Correct*':  0,
                'col91120Correct*':  0,
                'col121150Correct*':  0,
                'col751PlusCorrect*':  0,

                'col110Fails*':  0,
                'col1120Fails*':  0,
                'col2130Fails*':  0,
                'col3145Fails*':  0,
                'col4665Fails*':  0,
                'col6690Fails*':  0,
                'col91120Fails*':  0,
                'col121150Fails*': 0, 
                'col751PlusFails*': 0, 
                'colFirstFails*':  0
                }


    def initMonthlyIntervals(self, prefixes, totals):
        first = 150
        second = first
        for i in range(1, 21):
            if i > 1:
                first = second
            second += 30
            ivlPrefix = self.getIntervalPrefix(first, second)
            for p in prefixes:
                totals[p + ivlPrefix + 'Reps'] = 0
                totals[p + ivlPrefix + 'Correct*'] = 0
                totals[p + ivlPrefix + 'Fails*'] = 0
        totals[p + '751PlusReps'] = 0
        totals[p + '751PlusCorrect*'] = 0
        totals[p + '751PlusFails*'] = 0
        return totals 

    def loopCol(self, instructions):
        self.instructionsPresent = []
        stats = []
        totals = self.getBaseTotals()
        totals = self.initMonthlyIntervals(['col', 'char', 'noChar'], totals)
        self.leechNids = []
        surveyDate = '3000,10,12'
        if surveyDate is False:
            return
        self.dateStamp = self.getTimestamp(surveyDate)
        progressWidget, bar, message = self.getProgressBar()
        learningReviewing = []
        learningReviewing.append(self.grabLearning())
        learningReviewing.append(self.grabReviews())
        bar.setMinimum(0)
        total = len(learningReviewing[0]) + len(learningReviewing[1])
        strTotal = str(total)
        bar.setMaximum(total)
        divisor = 200
        for cards in learningReviewing:
            for cardCount, cid in enumerate(cards):
                        if cardCount % divisor == 0:
                            bar.setValue(cardCount)
                            message.setText('Processing Card Data ' +  str(cardCount)  +'/' + strTotal + '...')
                            mw.app.processEvents()
                        card = self.mw.col.getCard(cid)
                        note = card.note()
                        model = card.model()
                        reps = self.getRepInfo(cid)
                        if len(reps) == 0: 
                            continue
                        if model['type'] == 1:
                            template = model['tmpls'][0]
                        else:
                            template = model['tmpls'][card.ord]
                        card.instructionId = self.getStringDeckNoteCardIds(card.did, note.mid, card.ord)
                        if card.instructionId in instructions:
                            individualInstruction = instructions[card.instructionId]
                            if individualInstruction is False:
                                continue
                            noChar = True
                            if 'RecChar' in individualInstruction or 'ProdChar' in individualInstruction:
                                noChar = False
                            if individualInstruction is not False:
                                frontFields = self.getFields(template['qfmt'])
                                backFields =  self.getFields(template['afmt'])
                                frontImageAudio = self.checkImageAudio(frontFields, note)
                                backImageAudio = self.checkImageAudio(backFields, note)
                                finalInstruction = '-'.join(individualInstruction + frontImageAudio) + '_' + '-'.join(backImageAudio) + '_'
                                if finalInstruction not in self.instructionsPresent:
                                    self.instructionsPresent.append(finalInstruction)
                                    totals = self.addTotalNamesAndInitialize(totals, finalInstruction, noChar)
                                    totals = self.initMonthlyIntervals([finalInstruction], totals)
                                self.addToTotals(totals, reps, finalInstruction, noChar, card, note, frontFields, backFields)
        progressWidget.close()
        self.calculateInterpretedValues(totals)



    def calculateFrequencyScores(self, totals, freqList):
        scores = []
        for t in totals:
            prefix = False
            if t.endswith('KnownWordsCombined*'):
                prefix = t[:-19]
                nameTotal = prefix + 'TotalFrequencyCombined'
                nameUnique = prefix + 'UniqueWordFrequencyCombined'
                nameTotalCount = prefix +  'TotalWordsCombined'
                nameUniqueCount = prefix +  'FrequentWordsCombined'
                nameAnyCount =  prefix +  'TotalOccurencesCombined'
            elif t.endswith('KnownWordsFront*'):
                prefix = t[:-16]
                nameTotal = prefix + 'TotalFrequencyFront'
                nameUnique = prefix + 'UniqueWordFrequencyFront'
                nameTotalCount = prefix +  'TotalWordsFront'
                nameUniqueCount = prefix +  'FrequentWordsFront'
                nameAnyCount =  prefix +  'TotalOccurencesFront'
            elif t.endswith('KnownWordsBack*'):
                prefix = t[:-15]
                nameTotal = prefix +  'TotalFrequencyBack'
                nameUnique = prefix +  'UniqueWordFrequencyBack'
                nameTotalCount = prefix +  'TotalWordsBack'
                nameUniqueCount = prefix +  'FrequentWordsBack'
                nameAnyCount =  prefix +  'TotalOccurencesBack'
            if prefix is not False:
                if nameTotal not in self.matchedWordsCatalog:
                    matchedWords = self.getMatchedWords(totals[t], freqList)
                    self.matchedWordsCatalog[nameTotal] = matchedWords
                else:
                    matchedWords = self.matchedWordsCatalog[nameTotal]
                totalScore, totalWordCount, uniqueScore, uniqueWordCount = self.getFrequencyData(matchedWords, totals[t], freqList, prefix)
                scores.append([nameTotal, totalScore])
                scores.append([nameUnique, uniqueScore])
                scores.append([nameTotalCount, len(totals[t])])
                scores.append([nameUniqueCount, uniqueWordCount])
                scores.append([nameAnyCount, totalWordCount])
        for s in scores:
            totals[s[0]] = s[1]
        return totals


    def stripWordLists(self, totals):
        for t in totals:
            if 'KnownWords' in t:
                totals[t] = len(totals[t])
        return totals

    def calculateInterpretedValues(self, totals):
        progressWidget, bar, message = self.getCalcProgressBar()
        bar.setMaximum(3)
        bar.setValue(0)
        message.setText('Loading Frequency List - Process: 0/3')
        mw.app.processEvents()
        freqList = self.getFrequencyList()
        bar.setValue(1)
        message.setText('Calculation Frequency Data (May take several minutes) - Process: 1/3')
        mw.app.processEvents()
        self.matchedWordsCatalog = {}
        totals =  self.calculateFrequencyScores(totals, freqList)
        totals = self.stripWordLists(totals)
        # colTotFreq = self.getTotFreq(totalKnownWords, freqList)
        bar.setValue(2)
        message.setText('Compiling and Sending Data - Process 2/3')
        mw.app.processEvents()
        self.prepareFinalResults(totals)

        bar.setValue(3)
        message.setText('Finishing - Process 3/3')
        mw.app.processEvents()
        progressWidget.close()


    def addStartingIntervalsToResults(self, p, results, totals):
        for ivlPrefix in self.startingIntervals:
            results = self.addFailRetRepToResults(p, ivlPrefix, results, totals)
        return results 

    def addMonthlyIntervalsToResults(self, p, results, totals):
        first = 150
        second = first
        for i in range(1, 21):
            if i > 1:
                first = second
            second += 30
            ivlPrefix = self.getIntervalPrefix(first, second)
            results = self.addFailRetRepToResults(p, ivlPrefix, results, totals)
        ivlPrefix = '751Plus'
        results = self.addFailRetRepToResults(p, ivlPrefix, results, totals)
        return results

    def addFailRetRepToResults(self, p, ivlPrefix, results, totals):
        results[p + ivlPrefix + 'RetentionRate'] = self.percentageCalc(totals[p + ivlPrefix + 'Correct*'], totals[p + ivlPrefix +  'Reps'])
        results[p + ivlPrefix + 'FirstFail'] = self.percentageCalc(totals[p + ivlPrefix + 'Fails*'], totals[p + 'FirstFails*'])
        results[p + ivlPrefix +  'Reps'] = totals[p + ivlPrefix +  'Reps']
        return results

    def removeFromTotals(self, names, totals):
        for n in names:
            del totals[n]
        return totals

    def prepareFinalResults(self, totals):
        prefixes = self.instructionsPresent
        prefixes += ['col', 'noChar', 'char']
        results = {}
        for p in prefixes:
            results[p + 'TotalReps'] = totals[p + 'TotalReps']
            results[p + 'TotalReviewReps'] = totals[p + 'TotalReviewReps']
            results[p + 'TotalNewReps'] = totals[p + 'TotalNewReps']
            results[p + 'AvgTime'] = self.timeCalc(totals[p + 'TotalTime'], totals[p + 'TotalReps'])
            results[p + 'AvgReviewTime'] = self.timeCalc(totals[p + 'TotalReviewTime'], totals[p + 'TotalReviewReps'])
            results[p + 'AvgNewTime'] = self.timeCalc(totals[p + 'TotalNewTime'], totals[p + 'TotalNewReps'])
            results[p + 'TotalTime'] = totals[p + 'TotalTime']
            results[p + 'TotalReviewTime'] = totals[p + 'TotalReviewTime']
            results[p + 'TotalNewTime'] = totals[p + 'TotalNewTime']
            results[p + 'TotalCards'] = totals[p + 'TotalCards']
            results[p + 'OverallRetention'] = self.percentageCalc(totals[p + 'TotalCorrect*'], totals[p + 'TotalReps'])
            results[p + 'ReviewRetention'] = self.percentageCalc(totals[p + 'TotalReviewCorrect*'], totals[p + 'TotalReviewReps'])
            results[p + 'NewRetention'] = self.percentageCalc(totals[p + 'TotalNewCorrect*'], totals[p + 'TotalNewReps'])
            results[p + 'Leeches'] = totals[p + 'Leeches']
            results = self.addStartingIntervalsToResults(p, results, totals)
            # results[p + '121150Fails*'] = totals[p + '121150Fails*']
            # results[p + 'FirstFails*'] = totals[p + 'FirstFails*']
            results = self.addMonthlyIntervalsToResults(p, results, totals)
            if not p.startswith('RecChar') and not p.startswith('ProdChar') and p not in ['char', 'col']:
                results[p + 'TotalWordsFront'] = totals[p + 'TotalWordsFront']
                results[p + 'TotalOccurencesFront'] = totals[p + 'TotalOccurencesFront']
                results[p + 'FrequentWordsFront'] = totals[p + 'FrequentWordsFront']
                results[p + 'TotalFrequencyFront'] = totals[p + 'TotalFrequencyFront']
                results[p + 'UniqueWordFrequencyFront'] = totals[p + 'UniqueWordFrequencyFront']
                results[p + 'TotalWordsBack'] = totals[p + 'TotalWordsBack']
                results[p + 'TotalOccurencesBack'] = totals[p + 'TotalOccurencesBack']
                results[p + 'FrequentWordsBack'] = totals[p + 'FrequentWordsBack']
                results[p + 'TotalFrequencyBack'] = totals[p + 'TotalFrequencyBack']
                results[p + 'UniqueWordFrequencyBack'] = totals[p + 'UniqueWordFrequencyBack']
                results[p + 'TotalWordsCombined'] = totals[p + 'TotalWordsCombined']
                results[p + 'TotalOccurencesCombined'] = totals[p + 'TotalOccurencesCombined']
                results[p + 'FrequentWordsCombined'] = totals[p + 'FrequentWordsCombined']
                results[p + 'TotalFrequencyCombined'] = totals[p + 'TotalFrequencyCombined']
                results[p + 'UniqueWordFrequencyCombined'] = totals[p + 'UniqueWordFrequencyCombined']

        results['colReviewAndNewCardCount'] = self.getAllCardCount()
        data = {'data' : results}
        self.sendJsonToApi(json.dumps(data, ensure_ascii=False))

    def getAllCardCount(self):
        return len(self.find.Finder(self.mw.col).findCards(''))  
       
    def getTimestamp(self, date):
        return time.mktime(datetime.strptime(date, "%Y,%m,%d").timetuple())

    def sendJsonToApi(self, data):
        try:
            session = requests.session()
            cookieJar = []
            for c in self.cookies:
                cookie = requests.cookies.create_cookie(name=c['name'], value= c['value'], domain= c['domain'], path = c['path'], secure=c['secure'], rest={'HttpOnly':c['httponly']})
                session.cookies.set_cookie(cookie)
            headers = {'content-type': 'application/json'}
            r = session.post(url = self.POST_ENDPOINT, data = data, headers=headers)
            if r.status_code != 200 and r.status_code != 201:
                miInfo('Something went wrong when trying to submit your trial data. Please ###REPORT THIS ON THE DISCORD SERVER### so that we can troubleshoot your issue.')
            else:
                miInfo('Trial data has been successfully submitted!')
        except:
            miInfo('There was an error with the addon. Please ###REPORT THIS ON THE DISCORD SERVER### so that we can troubleshoot your issue.')

    def maybeUpdateBar(self, counter, bar, message, strTotal, name):
        divisor = 1000
        if counter % divisor == 0:
            bar.setValue(counter)
            message.setText('Calculating frequency scores for "' + name  + '" '  +  str(counter)  +'/' + strTotal + '...')
            mw.app.processEvents()

    def getFrequencyData(self, matchedWords, wordOccurences, freq, name):
        progressWidget, bar, message = self.getCalcProgressBar()
        totalCards = len(matchedWords)
        strTotal = str(totalCards)
        bar.setMaximum(totalCards)
        bar.setValue(0)
        uniqueWordCount = 0
        freqValueTotal = 0
        freqValueUnique = 0
        totalWordCount = 0
        for word in matchedWords:
            uniqueWordCount += 1
            self.maybeUpdateBar(uniqueWordCount, bar,message, strTotal, name)
            idx = freq.index(word)
            occurences = wordOccurences[word]
            freqValueTotal += idx * occurences
            freqValueUnique += idx
            totalWordCount += occurences

        bar.setValue(totalCards)
        progressWidget.close()
        try:
            return round((freqValueTotal/totalWordCount), 4), totalWordCount, round((freqValueUnique/uniqueWordCount), 4), uniqueWordCount
        except:
            return None, None, None, None

    def getMatchedWords(self, words, freq):
        wordsOnly = words.keys()
        matchedWords = set(wordsOnly).intersection(freq)
        return matchedWords

    def incrementWordInKnownWords(self, known, words):
        for word in words:
            if word in known:
                known[word] += 1
            else:
                known[word] = 1

    def updateKnownWords(self, totals, instruction, note, frontFields, backFields):
        fields = self.mw.col.models.fieldNames(note.model())
        combinedWords = []
        frontWords = []
        backWords = []
        for field in fields:
            words = self.getWordsInField(note[field])
            if field in frontFields:
                frontWords += words
            if field in backFields:
                backWords += words
            combinedWords += words
        
        self.incrementWordInKnownWords(totals[instruction + 'KnownWordsFront*'], frontWords)
        self.incrementWordInKnownWords(totals[instruction + 'KnownWordsBack*'], backWords)
        self.incrementWordInKnownWords(totals[instruction + 'KnownWordsCombined*'], combinedWords)
        self.incrementWordInKnownWords(totals['noCharKnownWordsFront*'], frontWords)
        self.incrementWordInKnownWords(totals['noCharKnownWordsBack*'], backWords)
        self.incrementWordInKnownWords(totals['noCharKnownWordsCombined*'], combinedWords)
        return totals

    def getProgressBar(self):
        progressWidget = QWidget(None)
        textDisplay = QLabel()
        progressWidget.setWindowIcon(QIcon(join(self.path, 'icons', 'mia.png')))
        progressWidget.setWindowTitle("Gathering Statistics...")
        textDisplay.setText("Loading... ")
        progressWidget.setFixedSize(500, 100)
        progressWidget.setWindowModality(Qt.ApplicationModal)
        bar = QProgressBar(progressWidget)
        layout = QVBoxLayout()
        layout.addWidget(textDisplay)
        layout.addWidget(bar)
        progressWidget.setLayout(layout) 
        bar.move(10,10)
        per = QLabel(bar)
        per.setAlignment(Qt.AlignCenter)
        progressWidget.show()
        progressWidget.setFocus()
        return progressWidget, bar, textDisplay;

    def getCalcProgressBar(self):
        progressWidget = QWidget(None)
        textDisplay = QLabel()
        progressWidget.setWindowIcon(QIcon(join(self.path, 'icons', 'mia.png')))
        progressWidget.setWindowTitle("Calculating Statistics...")
        textDisplay.setText("Loading... ")
        progressWidget.setFixedSize(500, 100)
        progressWidget.setWindowModality(Qt.ApplicationModal)
        bar = QProgressBar(progressWidget)
        layout = QVBoxLayout()
        layout.addWidget(textDisplay)
        layout.addWidget(bar)
        progressWidget.setLayout(layout) 
        bar.move(10,10)
        per = QLabel(bar)
        per.setAlignment(Qt.AlignCenter)
        progressWidget.show()
        progressWidget.setFocus()
        return progressWidget, bar, textDisplay;

    def getWordsInField(self, text):
        # return
        text = re.sub(r'\[.*?\]', '', text)
        results = self.dictParser.getParsed(text)
        # showInfo(str(results))
        results = self.dictParser.wordData(results)
        return results
        # Pyperclip.copy(json.dumps(results,  ensure_ascii= False))
        # showInfo('copied')
        # 
            

miTrial = TrialUploader()
# miTrial.checkApiStatus()


def setupGuiMenu():
    addMenu = False
    if not hasattr(mw, 'MIAMainMenu'):
        mw.MIAMainMenu = QMenu('MIA',  mw)
        addMenu = True
    if not hasattr(mw, 'MIAMenuSettings'):
        mw.MIAMenuSettings = []
    if not hasattr(mw, 'MIAMenuActions'):
        mw.MIAMenuActions = []

    action = QAction("Submit Anki Statistics", mw)
    action.triggered.connect(miTrial.openLogin)
    mw.MIAMenuActions.append(action)

    mw.MIAMainMenu.clear()
    for act in mw.MIAMenuSettings:
        mw.MIAMainMenu.addAction(act)
    mw.MIAMainMenu.addSeparator()
    for act in mw.MIAMenuActions:
        mw.MIAMainMenu.addAction(act)

    if addMenu:
        mw.form.menubar.insertMenu(mw.form.menuHelp.menuAction(), mw.MIAMainMenu)  

setupGuiMenu()