# -*- coding: utf-8 -*-
# 
from os.path import  join, dirname
# import re
import aqt
from anki.hooks import addHook, wrap
from aqt import mw
import anki.find
# from aqt.qt import QAction
# from aqt.utils import showInfo, shortcut
from aqt.qt import *
import json
from . import Pyperclip
# from datetime import datetime
# from aqt.browser import DataModel
# import time
from anki.sched import Scheduler
import anki.schedv2
import math
from .miutils import miInfo, miAsk
# import anki.find
import json
# from .accentExporter import AccentDictionaryParser
# import requests 
from aqt.webview import AnkiWebView, AnkiWebPage



def miAcceptNavigationRequest(self, url, navType, isMainFrame):
    if hasattr(self, 'miaDiscordAuth'):
        return super(AnkiWebPage, self).acceptNavigationRequest(url, navType, isMainFrame)
    else:
        return ogAccept(self, url, navType, isMainFrame)

ogAccept = AnkiWebPage.acceptNavigationRequest
AnkiWebPage.acceptNavigationRequest = miAcceptNavigationRequest


class MIADiscordAuth(AnkiWebView):
    def __init__(self, trialHandler, path):
        AnkiWebView.__init__(self)
        self.path = path
        self.trialHandler = trialHandler
        self._page.miaDiscordAuth = True
        self.setWindowIcon(QIcon(join(self.path, 'icons', 'mia.png')))
        self.setWindowTitle("Login")
        self.cookies = []
        self.cookieStore =  self._page.profile().cookieStore()
        self.cookieStore.deleteAllCookies()
        self.cookieStore.cookieAdded.connect(self.showCookiedInfo)
        self._page.setUrl(QUrl('https://trials.massimmersionapproach.com/api/auth/discord'))
        self._page.loadFinished.connect(self.checkUpdateUrl)
        self.show()


    def closeEvent(self, event):
        self._page.deleteLater()
        event.accept()
   
    def checkUpdateUrl(self, url):
        if self._page.url().url().startswith('https://trials.massimmersionapproach.com/api/auth/discord/redirect?code='):
            self._page.toPlainText(self.parseJsonResult)
            

    def parseJsonResult(self, text):
        info = json.loads(text)
        if info['miaDiscord'] == False:
            self._page.setUrl(QUrl('https://www.patreon.com/massimmersionapproach'))
            miInfo('Unfortunately, it appears that you are not currently a member of the official MIA Discord server. The Discord server is only available for our Patreon supporters, if you like what we do please consider supporting us there! 😄')
        else:
            if len(self.cookies) > 0:
                self.close()
                self.trialHandler.openSubmitGui(self.cookies, info['discordUsername'])
            else:
                self._page.setUrl(QUrl('https://trials.massimmersionapproach.com/api/auth/discord'))
                miInfo('Something appears to have gone wrong with your login. Please try again.')
        
    def showCookiedInfo(self, c):
        if not c.domain() == 'trials.massimmersionapproach.com':
            return   
        data = {"name": bytearray(c.name()).decode(), "domain": c.domain(), "value": bytearray(c.value()).decode(),
                    "path": c.path(), "expirationDate": c.expirationDate(), "secure": c.isSecure(),
                    "httponly": c.isHttpOnly()}
        # cookieList.append(data)
        self.cookies.append(data)
        # self.toJson()

    def toJson(self):
        cookieList = []
        for c in self.cookies:
            data = {"name": bytearray(c.name()).decode(), "domain": c.domain(), "value": bytearray(c.value()).decode(),
                    "path": c.path(), "expirationDate": c.expirationDate().toString(Qt.ISODate), "secure": c.isSecure(),
                    "httponly": c.isHttpOnly()}
            cookieList.append(data)

        Pyperclip.copy(json.dumps(cookieList))
        miInfo("Cookie as list of dictionary:")
