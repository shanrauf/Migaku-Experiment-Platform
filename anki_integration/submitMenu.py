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

class MIALabel(QLabel):
    clicked=pyqtSignal()
    def __init__(self, parent=None):
        QLabel.__init__(self, parent)

    def mousePressEvent(self, ev):
        self.clicked.emit()


"deck:ALL" "note:MIA Japanese" "card:Reverse"
class SubmitGui(QWidget):
    def __init__(self, mw, path, processor, userName):
        super(SubmitGui, self).__init__()
        self.mw = mw
        self.path = path
        self.userName = userName
        self.processor = processor
        self.tabs = QTabWidget()
        self.layout = QVBoxLayout()
        self.layout.addWidget(self.tabs)
        self.setWindowIcon(QIcon(join(self.path, 'icons', 'mia.png')))
        self.setWindowTitle("Anki Stats Processer")
        self.setLayout(self.layout)
        self.initTooltips()
        self.decksNoteCard = self.getNoteCardByDeck()
        self.guideTab = self.getGuideTab()
        self.submitTab = self.getSubmitTab()
        self.tabs.addTab(self.guideTab, "Instructions")
        self.tabs.addTab(self.submitTab, "Submit Stats")
        self.initHandlers()
        self.cardTypeRows = []
        self.setMinimumSize(780,500)
        self.show()

    def openBrowserShowCardsByDeckNoteCard(self, deck, note, card):
        text = '"deck:%s" "note:%s" "card:%s"'%(deck, note, card)
        browser = aqt.DialogManager._dialogs["Browser"][1]
        if not browser:
            mw.onBrowse()
            browser = aqt.DialogManager._dialogs["Browser"][1]
        if browser:
            browser.form.searchEdit.lineEdit().setText(text)
            browser.onSearchActivated()
    
    def closeEvent(self, event):
        self.guideTab.deleteLater()
        event.accept()

    def initTooltips(self):
        pass

    def getConfig(self):
        return self.mw.addonManager.getConfig(__name__)
        
    def loadConfig(self):
        pass
       
    def saveConfig(self):
        pass
        nc = self.getConfig()
        self.mw.addonManager.writeConfig(__name__, nc)
        self.hide()
        self.mw.refreshMIADictConfig()
   
    def initHandlers(self):
        pass 

    def setupLayout(self):
        pass
        groupLayout = QHBoxLayout()
        dictsLayout = QVBoxLayout()
        exportsLayout = QVBoxLayout()

    def getGuideTab(self):
        url = 'https://www.youtube.com/embed/707qS5O7BHY'
        embed = '<iframe style="width:100%; height:100%;margin:auto;" frameborder="0"  src="'+ url + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope;" allowfullscreen></iframe>'
        guideTab = QWebEngineView(parent=self)
        guideTab.setHtml(embed)
        return guideTab


    def bold(self, text):
        return '<b>' + text + '</b>'

    def getHeaderAndIgnoreCheckBox(self, name, deckBox):
        deckName = 'Deck: ' + name
        header = QHBoxLayout()
        headlab = QLabel(self.bold(deckName))
        headlab.setStyleSheet("font-size: 17px; ")
        header.addWidget(headlab)
        header.addStretch()
        ignore = QCheckBox('Ignore this deck.')
        ignore.deckBox = deckBox
        header.addWidget(ignore)
        header.setContentsMargins(12,0,12,0)
        return header, ignore

    def getDeckBox(self, dnc):
        deckBox = QGroupBox()
        deckBox.setStyleSheet("QGroupBox {padding:5px; margin-bottom: 35px; } ")
        deckBox.deckName = dnc[0]
        groupLayout = QVBoxLayout()
        groupLayout.setContentsMargins(5,5,5,5)
        header, ignore = self.getHeaderAndIgnoreCheckBox(deckBox.deckName, deckBox)
        groupLayout.addLayout(header)
        models = dnc[2]
        cardTypesRows = [] 
        for m in models:
            mName,mid,cardTypes = m
            ngb = QGroupBox()
            ngb.setStyleSheet('QGroupBox {border:1px solid gray; border-radius: 3px; padding:5px; margin-bottom: 10px;}')
            nvbox = QVBoxLayout()
            nvbox.setContentsMargins(5,0,5,5)
            nvbox.addWidget(QLabel(self.bold('Note Type: ' + mName)))
            for ct in cardTypes:
                layout, widgets = self.getNoteTypeEntryRow(mName, ct[0], deckBox)
                nvbox.addLayout(layout)
                cardTypesRows.append({'widgets': widgets, 'id' : self.getStringDeckNoteCardIds(dnc[1], mid, ct[1])})
            ngb.setLayout(nvbox)
            groupLayout.addWidget(ngb)
        deckBox.rowInfo =  {'ignoreDeck': ignore, 'rows': cardTypesRows}
        self.cardTypeRows.append(deckBox)
        deckBox.setLayout(groupLayout)
        return deckBox

    def getStringDeckNoteCardIds(self, did, mid, cid):
        return str(did) + '-' + str(mid) + '-'+ str(cid)

    def getSearchCollectionEvent(self, deck, note, card):
        return lambda: self.openBrowserShowCardsByDeckNoteCard(deck, note, card)

    def getNoteTypeEntryRow(self, noteType, cardType, deckBox):
        layout = QHBoxLayout()
        widgets = {}
        layout.setContentsMargins(5,5,5,5)
        cardLabel = MIALabel('Card Type: '+ cardType +':')
        cardLabel.setStyleSheet('color: #0066cc; text-decoration: underline;')
        cardLabel.setCursor(QCursor(Qt.PointingHandCursor))
        cardLabel.clicked.connect(self.getSearchCollectionEvent(deckBox.deckName, noteType, cardType))
        layout.addWidget(cardLabel)
        layout.addWidget(self.getCharGroupBox(widgets, deckBox))
        layout.addWidget(self.getVocabSentenceGroupBox(widgets, deckBox))
        layout.addWidget(self.getClozeCheckBox(widgets, deckBox))
        layout.addWidget(self.getIgnoreCheckBox(widgets, deckBox))
        return layout, widgets

    def getClozeCheckBox(self, widgets, deckBox):
        widgets['cloze'] = QCheckBox('Cloze/MCD')
        widgets['cloze'].deckBox = deckBox
        return widgets['cloze']

    def getIgnoreCheckBox(self, widgets, deckBox):
        widgets['ignore'] = QCheckBox('Ignore this card type')
        widgets['ignore'].deckBox = deckBox
        return widgets['ignore']

    def getVocabSentenceGroupBox(self, widgets, deckBox):
        gb = QFrame()
        gb.setStyleSheet('border:1px solid gray; border-radius: 3px; padding:2px;')
        layout = QHBoxLayout()
        layout.setContentsMargins(2,2,2,2)
        widgets['vocab'] = QCheckBox('Vocabulary')
        widgets['sentence'] = QCheckBox('Sentence')
        widgets['vocab'].setStyleSheet('border:none;')
        widgets['sentence'].setStyleSheet('border:none;')
        widgets['vocab'].deckBox = deckBox
        widgets['sentence'].deckBox = deckBox
        layout.addWidget(widgets['vocab'])
        layout.addWidget(widgets['sentence'])
        gb.setLayout(layout)
        return gb

    def getCharGroupBox(self, widgets, deckBox):
        gb = QFrame()
        gb.setStyleSheet('border:1px solid gray; border-radius: 3px; padding:2px;')
        layout = QHBoxLayout()
        layout.setContentsMargins(2,2,2,2)
        widgets['recChar'] = QRadioButton('RRTK/RRTH')

        widgets['prodChar'] = QRadioButton('PRTK/PRTH')
        widgets['recChar'].deckBox = deckBox
        widgets['prodChar'].deckBox = deckBox
        widgets['recChar'].setStyleSheet('border:none;')
        widgets['prodChar'].setStyleSheet('border:none;')
        layout.addWidget(widgets['recChar'])
        layout.addWidget(widgets['prodChar'])
        gb.setLayout(layout)
        return gb

    def getSubmitTab(self):
        self.cardTypeRows = []
        submitTab = QWidget(self)
        scroller = QScrollArea()
        scroller.setWidget(submitTab)
        vBox = QVBoxLayout()
        userLabel = QLabel(' Logged in as: ' + self.userName )
        userLabel.setStyleSheet('font-size: 26px;')
        vBox.addWidget(userLabel)
        # vBox.setSpacing(35)
        for dnc in self.decksNoteCard:
            if len(dnc[2]) == 0:
                continue
            vBox.addWidget(self.getDeckBox(dnc))
        self.submitStats = QPushButton('Submit Stats')
        vBox.addWidget(self.submitStats)
        submitTab.setLayout(vBox)
        submitTab.setSizePolicy(QSizePolicy.Minimum, QSizePolicy.Minimum)
        scroller.setWidgetResizable(True)
        scroller.setHorizontalScrollBarPolicy(Qt.ScrollBarAlwaysOff)
        scroller.setVerticalScrollBarPolicy(Qt.ScrollBarAsNeeded)
        self.initDeckNoteCardHandles()
        return scroller


    def beginProcessing(self, cardTypeRows):
        if miAsk('Stats will now be submitted. Please confirm that you are ready to submit stats for user ' + self.userName +'.'):
            cardTypeInstructions = {}
            for deckBox in cardTypeRows:
                rows = deckBox.rowInfo['rows']
                for r in rows:
                    ctid = r['id']
                    instructions = self.getRowInstructions(r['widgets'])
                    cardTypeInstructions[ctid] = instructions
            if self.allFalse(cardTypeInstructions):
                miInfo('Currently all card types are set to be ignored. Please make sure you appropriately set your cards types before attempting to submit your data.')
                return
            self.processor.loopCol(cardTypeInstructions)

    def allFalse(self, instructions):
        for i, value in instructions.items():
            if value is not False:
                return False
        return True

    def getRowInstructions(self, widgets):
        recChar, prodChar, vocab, sentence, cloze, ignoreRow = self.splitWidgets(widgets)
        if ignoreRow.isChecked() or (not cloze.isChecked() and not recChar.isChecked() and not prodChar.isChecked() and not vocab.isChecked() and not sentence.isChecked()):
            return False
        else:
            if recChar.isChecked():
                return ['RecChar']
            elif prodChar.isChecked():
                return ['ProdChar']
            elif cloze.isChecked():
                return ['Cloze']
            elif sentence.isChecked() and vocab.isChecked():
                return ['Vocab', 'Sentence']
            elif sentence.isChecked():
                return ['Sentence']
            elif vocab.isChecked():
                return ['Vocab']
        return False

    def initDeckNoteCardHandles(self):
        ctr = self.cardTypeRows
        for deckBox in ctr:
            ignoreDeckCB = deckBox.rowInfo['ignoreDeck']
            rows = deckBox.rowInfo['rows']
            ignoreDeckCB.stateChanged.connect(self.deckIgnoreEvent(ignoreDeckCB, rows))
            self.setDeckRowEvents(rows, ignoreDeckCB)
            ignoreDeckCB.setChecked(True)
        self.submitStats.clicked.connect(lambda: self.beginProcessing(ctr))



    def setDeckRowEvents(self, rows, ignoreDeck):
        for r in rows:
            widgets = r['widgets']
            recChar, prodChar, vocab, sentence, cloze, ignoreRow = self.splitWidgets(widgets)
            recChar.toggled.connect(self.charEvent(recChar, prodChar, vocab, sentence, cloze, ignoreRow, ignoreDeck))
            prodChar.toggled.connect(self.charEvent(recChar, prodChar, vocab, sentence, cloze, ignoreRow, ignoreDeck))
            vocab.stateChanged.connect(self.vocabEvent(recChar, prodChar, vocab, sentence, cloze, ignoreRow, ignoreDeck))
            sentence.stateChanged.connect(self.sentenceEvent(recChar, prodChar, vocab, sentence, cloze, ignoreRow, ignoreDeck))
            cloze.stateChanged.connect(self.clozeEvent(recChar, prodChar, vocab, sentence, cloze, ignoreRow, ignoreDeck))
            ignoreRow.stateChanged.connect(self.ignoreRowEvent(recChar, prodChar, vocab, sentence, cloze, ignoreRow, ignoreDeck, rows))

    def clozeEvent(self, recChar, prodChar, vocab, sentence, cloze, ignoreRow, ignoreDeck):
        return lambda: self.disableNonClozeCheckBoxes(recChar, prodChar, vocab, sentence, cloze, ignoreRow, ignoreDeck)

    def disableNonClozeCheckBoxes(self, recChar, prodChar, vocab, sentence, cloze, ignoreRow, ignoreDeck):
        if cloze.isChecked():
            vocab.setChecked(False)
            sentence.setChecked(False)
            ignoreRow.setChecked(False)
            ignoreDeck.setChecked(False)
            self.uncheckRadioButtons(recChar, prodChar)
        if not cloze.isChecked() and not vocab.isChecked() and not recChar.isChecked() and not prodChar.isChecked() and not sentence.isChecked():
            ignoreRow.setChecked(True)


    def ignoreRowEvent(self, recChar, prodChar, vocab, sentence, cloze, ignoreRow, ignoreDeck, rows):
        return lambda: self.disableAppropriateCheckBoxes(recChar, prodChar, vocab, sentence, cloze, ignoreRow, ignoreDeck, rows)

    def disableAppropriateCheckBoxes(self, recChar, prodChar, vocab, sentence, cloze, ignoreRow, ignoreDeck, rows):
        if ignoreRow.isChecked():
            self.uncheckAll(recChar, prodChar, vocab, sentence, cloze)
            if self.allRowsChecked(rows) and not ignoreDeck.isChecked():
                ignoreDeck.setChecked(True)
        else:
            if not recChar.isChecked() and not prodChar.isChecked() and not vocab.isChecked() and not sentence.isChecked() and not cloze.isChecked():
                sentence.setChecked(True)

    def allRowsChecked(self, rows):
        for r in rows:
            if not r['widgets']['ignore'].isChecked():
                return False
        return True

    def uncheckAll(self, recChar, prodChar, vocab, sentence, cloze):
        vocab.setChecked(False)
        sentence.setChecked(False)
        cloze.setChecked(False)
        self.uncheckRadioButtons(recChar, prodChar)



    def splitWidgets(self, widgets):
        recChar = widgets['recChar']
        prodChar = widgets['prodChar']
        vocab = widgets['vocab']
        sentence = widgets['sentence']
        cloze = widgets['cloze']
        ignoreRow = widgets['ignore']
        return recChar, prodChar, vocab, sentence, cloze, ignoreRow


    def sentenceEvent(self, recChar, prodChar, vocab, sentence, cloze, ignoreRow, ignoreDeck):
        return lambda: self.clearIgnoreAndChars(sentence, vocab, recChar, prodChar, cloze, ignoreRow, ignoreDeck)

    def vocabEvent(self, recChar, prodChar, vocab, sentence, cloze, ignoreRow, ignoreDeck):
        return lambda: self.clearIgnoreAndChars(vocab, sentence, recChar, prodChar, cloze, ignoreRow, ignoreDeck)

    def clearIgnoreAndChars(self, target, other, recChar, prodChar, cloze, ignoreRow, ignoreDeck):
        if target.isChecked():
            cloze.setChecked(False)
            self.uncheckRadioButtons(recChar, prodChar)
            ignoreRow.setChecked(False)
            ignoreDeck.setChecked(False)
        if not target.isChecked() and not other.isChecked() and not recChar.isChecked() and not prodChar.isChecked() and not cloze.isChecked():
            ignoreRow.setChecked(True)

    def uncheckRadioButtons(self, recChar, prodChar):
        recChar.setAutoExclusive(False)
        prodChar.setAutoExclusive(False)
        recChar.setChecked(False)
        prodChar.setChecked(False)
        recChar.setAutoExclusive(True)
        prodChar.setAutoExclusive(True)

    def charEvent(self, recChar, prodChar, vocab, sentence, cloze, ignoreRow, ignoreDeck):
        return lambda: self.clearCheckBoxes(recChar, prodChar, vocab, sentence, cloze, ignoreRow, ignoreDeck)

    def clearCheckBoxes(self, recChar, prodChar, vocab, sentence, cloze, ignoreRow, ignoreDeck):
        if recChar.isChecked() or prodChar.isChecked():
            cloze.setChecked(False)
            vocab.setChecked(False)
            sentence.setChecked(False)
            ignoreRow.setChecked(False)
            ignoreDeck.setChecked(False)

    def ignoreAllCardTypes(self, cb, rows):
        if cb.isChecked():
            for r in rows:
                r['widgets']['ignore'].setChecked(True)

    def deckIgnoreEvent(self, cb, rows):
        return lambda: self.ignoreAllCardTypes(cb, rows)

    def getDecks(self):
        decksRaw = self.mw.col.decks.decks
        decks = []
        for did, deck in decksRaw.items():
            if not deck['dyn']:
                decks.append([deck['name'], did])
        return self.getSorted(decks)

    def getNoteCardByDeck(self):
        decks = self.getDecks()
        deckNoteCard = []
        for entry in decks:
            name, did = entry
            mids = self.mw.col.db.list("SELECT DISTINCT notes.mid FROM cards INNER JOIN notes ON notes.id=cards.nid WHERE cards.did = " + str(did))
            modelsCards = self.getNoteCards(mids)
            deckNoteCard.append([name, did, modelsCards])
        return deckNoteCard
    
    def getSorted(self, unsorted):      
        unsorted.sort(key=lambda x:x[0].lower())
        return unsorted

    def getNoteCards(self, mids):
        modelList = []
        for mid in mids:
            model = self.mw.col.models.get(mid)
            if model:
                mName = model['name']
                cardTypes = model['tmpls']
                cardList = []
                for ct in cardTypes:
                    cName = ct['name']
                    cOrd = ct['ord']
                    cardList.append([cName, cOrd])
                    cardList = self.getSorted(cardList)
                modelList.append([mName, mid, cardList])
        return self.getSorted(modelList)

    def getCardTypes(self, noteType):
        pass

    def getIgnoreDeckCB(self):
        pass

    def getCardTypeOptions(self):
        pass

    def initCardTypeOptionHandles(self):
        pass