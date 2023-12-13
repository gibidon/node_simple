const fs = require("fs/promises")
const path = require("path")
const chalk = require("chalk")

const notesPath = path.join(__dirname, "db.json")
// console.log(notesPath)

async function addNote(title) {
	const notes = await getNotes()
	console.log("typeof title ", typeof title)

	const note = { title, id: Date.now().toString() }

	notes.push(note)

	await fs.writeFile(notesPath, JSON.stringify(notes))

	console.log(chalk.bgGreen("note is added"))
}

// addNote("test")

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

async function removeNote(idToRemove) {
	console.log("typeof id", typeof id)
	let notes = await getNotes()

	notes = notes.filter(({ id }) => id !== idToRemove)
	console.log("changed notes", notes)
	await fs.writeFile(notesPath, JSON.stringify(notes))
}

module.exports = { addNote, printNotes, removeNote }
