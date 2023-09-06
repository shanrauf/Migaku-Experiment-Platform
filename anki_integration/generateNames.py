

frontCombinations = [[
'RecChar'], ['ProdChar'], ['Vocab'], ['Sentence'],['Vocab', 'Sentence'], ['Cloze']]

suffixesAll = [
['TotalReps', 'INT'],
['TotalReviewReps', 'INT'],
['TotalNewReps', 'INT'],
['AvgTime', 'FLOAT'],
['AvgReviewTime', 'FLOAT'],
['AvgNewTime', 'FLOAT'],
['TotalTime', 'FLOAT'],
['TotalReviewTime', 'FLOAT'],
['TotalNewTime', 'FLOAT'],
['TotalCards', 'INT'],
['OverallRetention', 'FLOAT'],
['ReviewRetention', 'FLOAT'],
['NewRetention', 'FLOAT'],
['Leeches', 'INT'],
['110RetentionRate', 'FLOAT'],
['1120RetentionRate', 'FLOAT'],
['2130RetentionRate', 'FLOAT'],
['3145RetentionRate', 'FLOAT'],
['4665RetentionRate', 'FLOAT'],
['6690RetentionRate', 'FLOAT'],
['91120RetentionRate', 'FLOAT'],
['110Reps', 'INT'],
['1120Reps', 'INT'],
['2130Reps', 'INT'],
['3145Reps', 'INT'],
['4665Reps', 'INT'],
['6690Reps', 'INT'],
['91120Reps', 'INT'],
['121150Reps', 'INT'],
['110FirstFail', 'FLOAT'],
['1120FirstFail', 'FLOAT'],
['2130FirstFail', 'FLOAT'],
['3145FirstFail', 'FLOAT'],
['4665FirstFail', 'FLOAT'],
['6690FirstFail', 'FLOAT'],
['91120FirstFail', 'FLOAT'],
['121150FirstFail', 'FLOAT']
]

suffixesNoChar = [
['TotalWordsFront', 'INT'],
['TotalOccurencesFront', 'INT'],
['FrequentWordsFront', 'INT'],
['TotalFrequencyFront', 'FLOAT'],
['UniqueWordFrequencyFront', 'FLOAT'],
['TotalWordsBack', 'INT'],
['TotalOccurencesBack', 'INT'],
['FrequentWordsBack', 'INT'],
['TotalFrequencyBack', 'FLOAT'],
['UniqueWordFrequencyBack', 'FLOAT'],
['TotalWordsCombined', 'INT'],
['TotalOccurencesCombined', 'INT'],
['FrequentWordsCombined', 'INT'],
['TotalFrequencyCombined', 'FLOAT'],
['UniqueWordFrequencyCombined', 'FLOAT']
]

baseStats = [
['colAvgTime', 'FLOAT'],
['colAvgReviewTime', 'FLOAT'],
['colAvgNewTime', 'FLOAT'],
['colTotalTime', 'FLOAT'],
['colTotalReviewTime', 'FLOAT'],
['colTotalNewTime', 'FLOAT'],
['noCharAvgTime', 'FLOAT'],
['noCharAvgReviewTime', 'FLOAT'],
['noCharAvgNewTime', 'FLOAT'],
['noCharTotalTime', 'FLOAT'],
['noCharTotalReviewTime', 'FLOAT'],
['noCharTotalNewTime', 'FLOAT'],
['charAvgTime', 'FLOAT'],
['charAvgReviewTime', 'FLOAT'],
['charAvgNewTime', 'FLOAT'],
['charTotalTime', 'FLOAT'],
['charTotalReviewTime', 'FLOAT'],
['charTotalNewTime', 'FLOAT'],
['noCharTotalReps', 'INT'],
['charTotalReps', 'INT'],
['colTotalReps', 'INT'],
['noCharTotalReviewReps', 'INT'],
['charTotalReviewReps', 'INT'],
['colTotalReviewReps', 'INT'],
['noCharTotalNewReps', 'INT'],
['charTotalNewReps', 'INT'],
['colTotalNewReps', 'INT'],
['noCharTotalCards', 'INT'],
['noCharOverallRetention', 'FLOAT'],
['noCharReviewRetention', 'FLOAT'],
['noCharNewRetention', 'FLOAT'],
['noCharTotalWordsFront', 'INT'],
['noCharTotalOccurencesFront', 'INT'],
['noCharFrequentWordsFront', 'INT'],
['noCharTotalFrequencyFront', 'FLOAT'],
['noCharUniqueWordFrequencyFront', 'FLOAT'],
['noCharTotalWordsBack', 'INT'],
['noCharTotalOccurencesBack', 'INT'],
['noCharFrequentWordsBack', 'INT'],
['noCharTotalFrequencyBack', 'FLOAT'],
['noCharUniqueWordFrequencyBack', 'FLOAT'],
['noCharTotalWordsCombined', 'INT'],
['noCharTotalOccurencesCombined', 'INT'],
['noCharFrequentWordsCombined', 'INT'],
['noCharTotalFrequencyCombined', 'FLOAT'],
['noCharUniqueWordFrequencyCombined', 'FLOAT'],
['charTotalCards', 'INT'],
['charOverallRetention', 'FLOAT'],
['charReviewRetention', 'FLOAT'],
['charNewRetention', 'FLOAT'],
['colTotalCards', 'INT'],
['colOverallRetention', 'FLOAT'],
['colReviewRetention', 'FLOAT'],
['colNewRetention', 'FLOAT'],
['colLeeches', 'INT'],
['noCharLeeches', 'INT'],
['charLeeches', 'INT'],
['char110RetentionRate', 'FLOAT'],
['char1120RetentionRate', 'FLOAT'],
['char2130RetentionRate', 'FLOAT'],
['char3145RetentionRate', 'FLOAT'],
['char4665RetentionRate', 'FLOAT'],
['char6690RetentionRate', 'FLOAT'],
['char91120RetentionRate', 'FLOAT'],
['char121150RetentionRate', 'FLOAT'],
['char110FirstFail', 'FLOAT'],
['char1120FirstFail', 'FLOAT'],
['char2130FirstFail', 'FLOAT'],
['char3145FirstFail', 'FLOAT'],
['char4665FirstFail', 'FLOAT'],
['char6690FirstFail', 'FLOAT'],
['char91120FirstFail', 'FLOAT'],
['char121150FirstFail', 'FLOAT'],
['noChar110RetentionRate', 'FLOAT'],
['noChar1120RetentionRate', 'FLOAT'],
['noChar2130RetentionRate', 'FLOAT'],
['noChar3145RetentionRate', 'FLOAT'],
['noChar4665RetentionRate', 'FLOAT'],
['noChar6690RetentionRate', 'FLOAT'],
['noChar91120RetentionRate', 'FLOAT'],
['noChar121150RetentionRate', 'FLOAT'],
['noChar110FirstFail', 'FLOAT'],
['noChar1120FirstFail', 'FLOAT'],
['noChar2130FirstFail', 'FLOAT'],
['noChar3145FirstFail', 'FLOAT'],
['noChar4665FirstFail', 'FLOAT'],
['noChar6690FirstFail', 'FLOAT'],
['noChar91120FirstFail', 'FLOAT'],
['noChar121150FirstFail', 'FLOAT'],
['col110RetentionRate', 'FLOAT'],
['col1120RetentionRate', 'FLOAT'],
['col2130RetentionRate', 'FLOAT'],
['col3145RetentionRate', 'FLOAT'],
['col4665RetentionRate', 'FLOAT'],
['col6690RetentionRate', 'FLOAT'],
['col91120RetentionRate', 'FLOAT'],
['col121150RetentionRate', 'FLOAT'],
['col110FirstFail', 'FLOAT'],
['col1120FirstFail', 'FLOAT'],
['col2130FirstFail', 'FLOAT'],
['col3145FirstFail', 'FLOAT'],
['col4665FirstFail', 'FLOAT'],
['col6690FirstFail', 'FLOAT'],
['col91120FirstFail', 'FLOAT'],
['col121150FirstFail', 'FLOAT'],
['char110Reps', 'INT'],
['char1120Reps', 'INT'],
['char2130Reps', 'INT'],
['char3145Reps', 'INT'],
['char4665Reps', 'INT'],
['char6690Reps', 'INT'],
['char91120Reps', 'INT'],
['char121150Reps', 'INT'],
['noChar110Reps', 'INT'],
['noChar1120Reps', 'INT'],
['noChar2130Reps', 'INT'],
['noChar3145Reps', 'INT'],
['noChar4665Reps', 'INT'],
['noChar6690Reps', 'INT'],
['noChar91120Reps', 'INT'],
['noChar121150Reps', 'INT'],
['col110Reps', 'INT'],
['col1120Reps', 'INT'],
['col2130Reps', 'INT'],
['col3145Reps', 'INT'],
['col4665Reps', 'INT'],
['col6690Reps', 'INT'],
['col91120Reps', 'INT'],
['col121150Reps', 'INT']
]


def getIntervalPrefix(first, second):
        return str(first+ 1) + str(second)

def addMonthlyIntervalsToBase(baseStats):
    first = 150
    second = first
    prefixes = ['col', 'noChar', 'char']
    for i in range(1, 21):
        if i > 1:
            first = second
        second += 30
        ivlPrefix = getIntervalPrefix(first, second)
        for p in prefixes:
            baseStats.append([p + ivlPrefix + 'Reps', 'INT'])
            baseStats.append([p + ivlPrefix + 'RetentionRate', 'FLOAT'])
            baseStats.append([p + ivlPrefix + 'FirstFail', 'FLOAT'])
    for p in prefixes:
        baseStats.append([p + '751PlusReps', 'INT'])
        baseStats.append([p + '751PlusRetentionRate', 'FLOAT'])
        baseStats.append([p + '751PlusFirstFail', 'FLOAT'])

def addMonthlyIntervalsToSuffixes(suffixesAll):
    first = 150
    second = first
    prefixes = ['col', 'noChar', 'char']
    for i in range(1, 21):
        if i > 1:
            first = second
        second += 30
        ivlPrefix = getIntervalPrefix(first, second)
        suffixesAll.append([ivlPrefix + 'Reps', 'INT'])
        suffixesAll.append([ivlPrefix + 'RetentionRate', 'FLOAT'])
        suffixesAll.append([ivlPrefix + 'FirstFail', 'FLOAT'])     
    suffixesAll.append(['751PlusReps', 'INT'])
    suffixesAll.append(['751PlusRetentionRate', 'FLOAT'])
    suffixesAll.append(['751PlusFirstFail', 'FLOAT'])

addMonthlyIntervalsToBase(baseStats)
addMonthlyIntervalsToSuffixes(suffixesAll)

details = [[''],['Image'], ['Audio'], ['Image', 'Audio']]

finals = []
for idx,entry in enumerate(frontCombinations):
    starter = '-'.join(entry)
    for d in details:
            detail = '-'.join(d)
            if detail != '':
                detail = '-' + detail
            for d2 in details:
                detailBack = '-'.join(d2)
                for suffix in suffixesAll:
                    finals.append([starter + detail + '_' + detailBack +'_' + suffix[0], suffix[1]])
                if idx > 1:
                    for suffixNC in suffixesNoChar:
                        finals.append([starter + detail + '_' + detailBack +'_' + suffixNC[0], suffixNC[1]])
for bs in baseStats:
    finals.append(bs)


import json
with open('dbColumns.json', 'w', encoding="utf-8") as outfile:
    file = json.dumps(finals, ensure_ascii=False).replace('],', '],\n')
    outfile.write(file)