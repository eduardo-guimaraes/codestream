import { CSEntity } from "@codestream/protocols/api";
import { action } from "../common";
import { ActivityFeedActionType } from "./types";
import { sortBy } from "lodash-es";
import { CodemarkPlus } from "@codestream/protocols/agent";

export { reset } from "../actions";

export const addOlderActivity = (payload: { activities: string[]; hasMore: boolean }) => {
	return action(ActivityFeedActionType.AddOlder, {
		...payload
	});
};

export const addNewActivity = (model: string, activities: CSEntity[]) => {
	let sortedActivities = activities;
	switch (model) {
		case "codemark":
			if (activities.length > 1)
				sortedActivities = sortBy(sortedActivities as CodemarkPlus[], c => -c.lastActivityAt);
			break;
		default:
			break;
	}

	return action(
		ActivityFeedActionType.AddNew,
		sortedActivities.map(a => `${model}|${a.id}`)
	);
};
