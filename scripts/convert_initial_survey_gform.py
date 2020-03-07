import csv
import json

csvFile = "initial_survey.csv"
jsonFilePath = "initial_survey.json"


def convert24(str1):

    # Checking if last two elements of time
    # is AM and first two elements are 12
    if str1[-2:] == "AM" and str1[:2] == "12":
        return "00" + str1[2:-2]

    # remove the AM
    elif str1[-2:] == "AM":
        return str1[:-2]

    # Checking if last two elements of time
    # is PM and first two elements are 12
    elif str1[-2:] == "PM" and str1[:2] == "12":
        return str1[:-2]

    else:

        # add 12 to hours and remove PM
        return str(int(str1[:2]) + 12) + str1[2:8]


data = []

with open(csvFile, encoding='utf-8') as csvFile:
    csvReader = csv.DictReader(csvFile)
    for csvRow in csvReader:
        # If I cared, I would set the SurveyResponse createdAt to the below datetime...

        # Format timestamp: 2019/10/31 4:57:46 PM PDT -> 2019-10-31 16:57:46
        # date = csvRow["timestamp"].replace("/", "-").split(" ")[0]
        # time = " ".join(csvRow["timestamp"].replace("/", "-").split(" ")[1:3])
        # 4:57:46 PM -> 04:57:46 PM to pass to convert24
        # if len(time.split(":")[0]) == 1:
            # time = "0" + time
        # datetime = date + " " + convert24(time)
        # csvRow["timestamp"] = datetime

        payload = {}
        payload["email"] = csvRow["email"]
        del csvRow["email"]

        # We only needed this to manually check jcatScore once
        del csvRow["jcatScreenshot"]
        payload["data"] = csvRow
        payload = json.dumps(payload)

        # Add participant response to payload
        data.append(payload)

with open(jsonFilePath, "w", encoding='utf-8') as jsonFile:
  jsonFile.write(json.dumps(data))
