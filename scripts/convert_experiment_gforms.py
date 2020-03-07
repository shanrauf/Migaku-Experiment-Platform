import csv
import json
import requests

files = [{"name": "survey_1.csv", "surveyId": "p62siejg9umdlgxras7w8"},
         {"name": "survey_2.csv", "surveyId": "xybccfo7hu4c6p90dwgb2"}, ]


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
with open(files[1]["name"], encoding='utf-8') as file:
    csvReader = csv.DictReader(file)
    for csvRow in csvReader:
        # Ideally, createdAt and updatedAt were set to this value for SurveyResponse and
        # QuestionResponses, but idrc...
        # Format timestamp: 2019/10/31 4:57:46 PM PDT -> 2019-10-31 16:57:46
        # date = csvRow["timestamp"].replace("/", "-").split(" ")[0]
        # time = " ".join(csvRow["timestamp"].replace(
        #     "/", "-").split(" ")[1:3])
        # 4:57:46 PM -> 04:57:46 PM to pass to convert24
        # if len(time.split(":")[0]) == 1:
            # time = "0" + time
        # datetime = date + " " + convert24(time)
        # csvRow["timestamp"] = datetime

        # Since I don't care and since this isn't a question
        if "timestamp" in csvRow:
            del csvRow["timestamp"]

        # Format questions that I want as boolean values instead of Yes/No
        if "completedRRTK" in csvRow and csvRow["completedRRTK"] == "Yes":
            csvRow["completedRRTK"] = True
        else:
            csvRow["completedRRTK"] = False
        if "completedPRTK" in csvRow and csvRow["completedPRTK"] == "Yes":
            csvRow["completedPRTK"] = True
        else:
            csvRow["completedPRTK"] = False

        # Format questions for current endpoint
        payload = {}
        email = csvRow["email"]
        payload["email"] = email
        payload["data"] = csvRow
        del payload["data"]["email"]

        payload = json.dumps(payload)
        # Add participant response to payload
        data.append(payload)


idx = 0
for response in data:
    idx += 1
    data = json.loads(response)
    with open(str(idx) + ".json", "w", encoding='utf-8') as jsonFile:
        jsonFile.write(json.dumps(data).replace("ja_", "initial_"))
