

frontCombinations = [[
'RecChar'], ['ProdChar'], ['Vocab'], ['Sentence'],['Vocab', 'Sentence']]




suffixesAll = [
['AvgTime', 'FLOAT'],
['AvgRevTime', 'FLOAT'],
['AvgNewTime', 'FLOAT'],
['TotalTime', 'FLOAT'],
['TotalRevTime', 'FLOAT'],
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
['121PlusRetentionRate', 'FLOAT'],
['110FirstFail', 'FLOAT'],
['1120FirstFail', 'FLOAT'],
['2130FirstFail', 'FLOAT'],
['3145FirstFail', 'FLOAT'],
['4665FirstFail', 'FLOAT'],
['6690FirstFail', 'FLOAT'],
['91120FirstFail', 'FLOAT'],
['121PlusFirstFail', 'FLOAT']
]

suffixesNoChar = [
['TotalWordsFront', 'INT'],
['FrequentWordsFront', 'INT'],
['TotalFrequencyFront', 'FLOAT'],
['UniqueWordFrequencyFront', 'FLOAT'],
['TotalWordsBack', 'INT'],
['FrequentWordsBack', 'INT'],
['TotalFrequencyBack', 'FLOAT'],
['UniqueWordFrequencyBack', 'FLOAT'],
['TotalWordsCombined', 'INT'],
['FrequentWordsCombined', 'INT'],
['TotalFrequencyCombined', 'FLOAT'],
['UniqueWordFrequencyCombined', 'FLOAT']
]

baseStats = [
['noCharTotalCards', 'INT'],
['noCharOverallRetention', 'FLOAT'],
['noCharReviewRetention', 'FLOAT'],
['noCharNewRetention', 'FLOAT'],
['noCharTotalWordsFront', 'INT'],
['noCharFrequentWordsFront', 'INT'],
['noCharTotalFrequencyFront', 'FLOAT'],
['noCharUniqueWordFrequencyFront', 'FLOAT'],
['noCharTotalWordsBack', 'INT'],
['noCharFrequentWordsBack', 'INT'],
['noCharTotalFrequencyBack', 'FLOAT'],
['noCharUniqueWordFrequencyBack', 'FLOAT'],
['noCharTotalWordsCombined', 'INT'],
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
['colNewRetention', 'FLOAT']
]

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