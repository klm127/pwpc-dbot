/**
 * Map of all customIDs used for interactions.
 */
const interactionIDs = {
	slash: {
		newVote: "newboolvote",
		messageAll: "messageall",
		ping: "ping",
		register: "register",
		update: "update",
	},
	modal: {
		/** Any modal with this ID will not have its interactions distributed as normal; this is used when you are doing an 'awaitModalSubmit' callback instead of dispatching interactions through the picker.  */
		nopick: "nopick",
		register: "register",
		newVote: "newvote",
		update: "update",
	},
	buttons: {
		newvote: {
			info: "voteinfo",
			time: "votetime",
			submit: "submit",
			cancel: "cancel",
		},
	},
	selects: {
		newvote: {
			type: "votetype",
		},
	},
};

export default interactionIDs;
