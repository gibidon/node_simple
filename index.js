// console.log(__dirname)
// console.log(__filename)

const yargs = require("yargs")
const pkg = require("./package.json")
const { addNote, removeNote, printNotes } = require("./notes.controller")

yargs.version(pkg.version)

yargs.command({
	command: "add",
	describe: "add new note to list",
	builder: {
		title: {
			type: "string",
			describe: "note title",
			demandOption: true,
		},
	},
	handler({ title }) {
		console.log("add command..", title)
		addNote(title)
	},
})

yargs.command({
	command: "list",
	describe: "print all notes",
	async handler() {
		printNotes()
	},
})

yargs.command({
	command: "remove",
	describe: "remove note by id",
	builder: { id: { type: "string", describe: "noteId", demandOption: true } },
	handler({ id }) {
		removeNote(id)
	},
})

yargs.parse()
