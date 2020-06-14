import produce from "immer";
import parser from "~/lib/parser";
import { ifValidId, createId } from "~/lib/utilities";

export default class Review {
    static title = "review";

    empty = {
        new: {
            title: "",
            days: [],
            status: process.env.settings.symbols.review.EMPTY,
            error: ""
        }
    };

    state = this.empty;

    id = createId();

    parse(s) {
        return produce(this.state, draft => {
            draft.new.status = process.env.settings.symbols.review.EDITING;
            Object.assign(draft.new, parser(s));
        });
    }

    clear() {
        return produce(this.state, draft => {
            draft.new = this.empty.new;
        });
    }

    new() {
        return produce(this.state, draft => {
            draft.new = this.empty.new;
            draft[this.id.next().value] = {
                ...this.state.new,
                status: process.env.settings.symbols.review.REVIEW
            };
        });
    }

    delete(ids) {
        return produce(this.state, draft => {
            ids.forEach(id => {
                ifValidId(id, () => delete draft[id]);
            });
        });
    }

    deleteAll() {
        return this.empty;
    }

    send({ id, title, days }) {
        return produce(this.state, draft => {
            draft[id].status = process.env.settings.symbols.review.SENDING;
        });
    }

    sendSuccess(id) {
        return produce(this.state, draft => {
            draft[id].status = process.env.settings.symbols.review.SEND_SUCCESS;
        });
    }

    sendFailure(id) {
        return produce(this.state, draft => {
            draft[id].status = process.env.settings.symbols.review.SEND_FAILURE;
        });
    }
}

// isSelected: false,

// toggleSelect(id) {
//     return produce(this.state, draft => {
//         draft[id].isSelected = !draft[id].isSelected;
//     });
// }

// manuallyCreateNew() {
//     return produce(this.state, draft => {
//         draft.new = {
//             ...this.empty.new,
//             ...{ status: process.env.settings.symbols.review.EDITING }
//         };
//         draft[this.id.next().value] = this.state.new;
//     });
// }

// update(id, j) {
//     return produce(this.state, draft => {
//         ifValidId(id, () => {
//             draft[id] = { ...draft[id], ...j };
//         });
//     });
// }
//
// updateDay({ reviewId, dayIndex, dayValue }) {
//     return produce(this.state, draft => {
//         draft.days[dayIndex] = dayValue;
//     });
// }
