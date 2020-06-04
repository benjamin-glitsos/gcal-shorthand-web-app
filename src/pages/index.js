import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading } from "rebass";
import { Input } from "@rebass/forms";
import { useUpdater } from "redux-lightweight";
import { wrapper } from "~/state/store";
import { inputActions, reviewActions, historyActions } from "~/state/redux";

const Index = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const inputState = useSelector(state => state.input);
    const timeZone = useSelector(state => state.user.time_zone);
    const onChangeHandler = e => {
        e.preventDefault();
        const value = e.target.value;
        dispatch(inputActions.update(value));
        if (value.length > 0) {
            dispatch(reviewActions.parse(value, timeZone));
        } else {
            dispatch(reviewActions.clear());
        }
    };
    const onKeyPressHandler = e => {
        if (e.key === "Enter") {
            dispatch(reviewActions.enter());
            dispatch(inputActions.clear());
        }
    };
    return (
        <Fragment>
            <Heading>{process.env.settings.title}</Heading>
            {/* TODO: make parser always return today as default instead of empty array for 'days' object key */}
            <Input
                type="text"
                placeholder="d, 2d, 2w buy some milk"
                value={inputState}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                my={4}
            />
            <pre>
                <code>{JSON.stringify(state, null, 4)}</code>
            </pre>
        </Fragment>
    );
};

export default Index;
