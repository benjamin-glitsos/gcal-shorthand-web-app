import { useDispatch } from "react-redux";
import { useUpdater } from "redux-lightweight";
import { Card, Button } from "rebass";
import { Label, Checkbox } from "@rebass/forms";
import { review } from "~/state/redux";
import { cond, anyMatches } from "~/lib/utilities";

export default function ReviewCard({ id, title, days, status, isSelected }) {
    const dispatch = useDispatch();
    const symbols = process.env.settings.symbols.review;
    return (
        <Card>
            <h2>
                {/* TODO: should be aware of multiple events to use plural. use pluralise package? */}
                {cond([
                    {
                        case: anyMatches([symbols.EDITING, symbols.REVIEW]),
                        return: "Create Event"
                    },
                    {
                        case: anyMatches([symbols.SENDING]),
                        return: "Sending..."
                    },
                    {
                        case: anyMatches([symbols.SEND_SUCCESS]),
                        return: "Done"
                    },
                    {
                        case: anyMatches([symbols.SEND_FAILURE]),
                        return: "Failed to Create Event"
                    },
                    {
                        case: true,
                        return: "Event"
                    }
                ])(status)}
            </h2>
            <p>{title}</p>
            {days.map(({ in: { number, period } }, i) => (
                <p key={number + period + i}>
                    <span>{(i === 0 ? "In" : "And").toUpperCase()}</span>
                    {number > 0 && <span>{number}</span>}
                    <span>{period}</span>
                </p>
            ))}
            {[
                {
                    title: "Delete",
                    isDisplayed: true,
                    onClick: () => dispatch(review.actions.delete([id]))
                },
                {
                    title: "Send",
                    isDisplayed: true,
                    onClick: () =>
                        dispatch(review.actions.send({ id, title, days }))
                }
            ]
                .filter(({ isDisplayed }) => isDisplayed)
                .map(({ title, onClick }) => (
                    <Button onClick={onClick}>{title}</Button>
                ))}
        </Card>
    );
}
