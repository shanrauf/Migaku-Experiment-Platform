# -*- coding: utf-8 -*-
# 
import re
from . import Pyperclip 
from aqt.addcards import AddCards
from aqt.utils import  showInfo
from . import reading 

class AccentDictionaryParser:
    def  __init__(self, mw):
        self.mecabAccents = reading.MecabController()
        self.counter = 0
        self.mw = mw
        self. ranges = [
  {"from": ord(u"\u3300"), "to": ord(u"\u33ff")},         # compatibility ideographs
  {"from": ord(u"\ufe30"), "to": ord(u"\ufe4f")},         # compatibility ideographs
  {"from": ord(u"\uf900"), "to": ord(u"\ufaff")},         # compatibility ideographs
  {"from": ord(u"\U0002F800"), "to": ord(u"\U0002fa1f")}, # compatibility ideographs
  {'from': ord(u'\u3040'), 'to': ord(u'\u309f')},         # Japanese Hiragana
  {"from": ord(u"\u30a0"), "to": ord(u"\u30ff")},         # Japanese Katakana
  {"from": ord(u"\u2e80"), "to": ord(u"\u2eff")},         # cjk radicals supplement
  {"from": ord(u"\u4e00"), "to": ord(u"\u9fff")},
  {"from": ord(u"\u3400"), "to": ord(u"\u4dbf")},
  {"from": ord(u"\U00020000"), "to": ord(u"\U0002a6df")},
  {"from": ord(u"\U0002a700"), "to": ord(u"\U0002b73f")},
  {"from": ord(u"\U0002b740"), "to": ord(u"\U0002b81f")},
  {"from": ord(u"\U0002b820"), "to": ord(u"\U0002ceaf")}  # included as of Unicode 8.0
]
    
    def getParsed(self, text):
        try:
            text = re.sub(r'<.*?>', '', text)
            text = re.sub(r'\[.*?\]', '', text)
            text = text.replace('\r','').replace('\n', '')
            text = self.mw.col.media.strip(text).encode("utf-8", "ignore")
            if not self.mecabAccents:
                self.mecabAccents = reading.MecabController()
            results = self.mecabAccents.accents(text)
            return results
        except Exception as e:
                self.mecabAccents = None
                raise 
     
    def wordData(self, results):
        wordResults = []

        for idx, val in enumerate(results):
            comma = False
            if val == 'EOS\r' or val == '':
                continue
            try:
                word, csv = val.split('\t')
            except:
                continue
                # import json
                # Pyperclip.copy(json.dumps(results,  ensure_ascii= False))
                # showInfo('copied')

            csv = csv.replace("\r", '')
            temp = [word] + csv.split(",")
            if len(temp) > 7:
                if self.isCJKString(temp[7]):
                    if temp[0] =='な':
                        wordResults.append('な')
                    else:
                        wordResults.append(temp[7])
        # del wordResults[-1]
        # del wordResults[-1]
        return wordResults

    def isCJKString(self, text):
        for char in text:
            if not self.isCJK(char):
                return False
        return True

    def isCJK(self, char):
      return any([range["from"] <= ord(char) <= range["to"] for range in self.ranges])
