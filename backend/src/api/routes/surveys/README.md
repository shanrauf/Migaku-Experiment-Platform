#### `/surveys` GET (200)

Get all surveys

Parameters:

```ts
{
    experimentId!: String,
    participantId?: String, // returns surveys that the participant has completed
    surveyId?: String, // Returns metadata of specific survey
    visibility?: String // default = "public"; ("public", "private?) (NOTE: participants shouldn't be authenticated to request "private" surveys)
}
```

Response:

```ts
{
    surveys: Survey[] // (metadata e.x title/description/requirements) (if surveyId parameter, this array length is just 1)
}
```

### `/surveys` POST (200)

Creates a survey

Parameters:
```ts
{
    experimentId!: String
}
```

Body:

```ts
{
    surveyId?: String, // If empty, a random id is generated
    title: String,
    description?: String,
    startDate: String, // (ISO string)
    endDate?: String, // (ISO string)
    surveyCategory: String, // (any string of your choice; e.x "regular", "initial", "mid-experiment")
    visibility: String, // ("public" | "private")
    sections: SurveySection[]
}
```

Response:

```ts
{
    surveys: Survey[]
}
```

### `/surveys/latest` GET (200)

Finds latest survey, then redirects to /experiments/:experimentId/surveys/:surveyId (GET)

Parameters:
```ts
{
    experimentId!: String
}
```

## `/surveys/:surveyId` (200) GET

Gets the metadata and questions/sections of survey

Parameters:

```ts
{
    experimentId!: String,
    sections?: sectionId[] // only return these sections/questions (good for pagination for example)
}
```

Response:

```ts
{
  ...Survey // (questions / sections, metadata, etc)
}
```

## `/surveys/latest` (201) POST

Finds latest survey, then redirects to /experiments/:experimentId/surveys/:surveyId (POST)

Parameters:
```ts
{
    experimentId!: String
}
```

## `/surveys/:surveyId` (201) POST

(Note this route can be posted to many times with new question key/value pairs; we submit survey here, then submit anki data here; if we don't want this, then validate that payload has every question from survey)
Submits the survey response of a participant

Parameters:
```ts
{
    experimentId!: String
}
```

Body:

```ts
{
    email: String, // (temporary due to Anki addon implementation)
    experimentId: String,
    ...questionKeyValuePairs // (temporary due to Anki implementation)
}
```

<!-- Ideally:
{
participantId: string;
experimentId: string
questions: Question[] # array of objects with key, value, type (String, int)
} -->

### `/surveys/latest/status?email=email` GET (200)

Returns 0 if email doesn't exist, 1 if readyToSync, 2 if surveyIncomplete, 3 if alreadySubmittedAnkiData (this is a legacy route for Anki implementation)

Parameters:
```ts
{
    experimentId!: String
}
```

## `/surveys/latest` (POST)

Finds latest survey, then POSTs to `/surveys:surveyId` with experimentId in body (legacy route to support Anki addon implementation)

Parameters:
```ts
{
    experimentId!: String
}
```

## TODO
- Implement query parameters in code for /surveys