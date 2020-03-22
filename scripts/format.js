const fs = require('fs');

/**
 * Question schema
 */
let questions = JSON.parse(fs.readFileSync('dbColumns.json'));

const data = []

for (let question of questions) {
	// question = ["questionId", "DATATYPE"]
	data.push({
		questionId: question[0],
		key: question[0],
		label: question[0],
		rules: null,
		note: null,
		required: true,
		questionType: "text",
		dataType: question[1].toLowerCase(),
		question: question[0]
	})
}

fs.writeFileSync('consensus-questions.json', JSON.stringify(data, null, 2));

/**
 * Array of questionIds
 */
let questions = JSON.parse(fs.readFileSync('dbColumns.json'));

const data = []

for (let question of questions) {
	// question = ["questionId", "DATATYPE"]
	data.push(question[0])
}

fs.writeFileSync('consensus-questionsIds.json', JSON.stringify(data, null, 2));