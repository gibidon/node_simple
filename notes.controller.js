const fs = require("fs/promises")
const path = require("path")
const chalk = require("chalk")

const notesPath = path.join(__dirname, "db.json")

async function addNote(title) {
	const notes = await getNotes()
	console.log("typeof title ", typeof title)

	const note = { title, id: Date.now().toString() }

	notes.push(note)

	saveNotes(notes)

	console.log(chalk.bgGreen("note is added"))
}

async function getNotes() {
	const notes = await fs.readFile(notesPath, { encoding: "utf-8" })
	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
	const notes = await getNotes()
	console.log(chalk.bgBlue("here is the list: "))
	notes.forEach((note) => {
		console.log(chalk.bgGray("title: ", note.title, "|", "id: ", note.id))
	})
}

async function saveNotes(notes) {
	await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function removeNote(idToRemove) {
	let notes = await getNotes()

	notes = notes.filter(({ id }) => id !== idToRemove)

	saveNotes(notes)
}

async function editNote(id, newTitle) {
	let notes = await getNotes()

	notes.map((note) => {
		if (note.id === id) {
			console.log("id found", note.id)
			note.title = newTitle
		}
	})

	// const noteToEditIndex = notes.findIndex((note) => note.id === id)
	// notes[noteToEditIndex].title = newTitle

	//shorter but less readable? 2 walks through arrays instead of 1?

	saveNotes(notes)
}

module.exports = { addNote, editNote, printNotes, removeNote }
