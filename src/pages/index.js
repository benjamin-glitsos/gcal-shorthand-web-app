import { Fragment } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import { Heading, Flex, Box } from "rebass";
import ReviewArea from "~/components/review-area";
import EventInput from "~/components/event-input";
import HistoryList from "~/components/history-list";
import InfoCard from "~/components/info-card";
import MainMenu from "~/components/main-menu";

export default function Index() {
    const state = useSelector(state => state);
    return (
        <Fragment>
            <Head>
                <title>{process.env.settings.title}</title>
            </Head>
            <Flex>
                <Box width={1 / 2}>
                    <Heading variant="h1">{process.env.settings.title}</Heading>
                </Box>
                <Box width={1 / 2}>
                    <MainMenu />
                </Box>
            </Flex>
            <EventInput
                placeholders={[
                    "work out today, or else...",
                    "d, 2d buy some milk",
                    "2w go to meeting",
                    "4d, 3y finish that book",
                    "t, m, 2m, 3m, 4m buy in bulk",
                    "t, d do it today, or maybe tomorrow",
                    "100d challenge is finished"
                ]}
            />
            <ReviewArea />
            <InfoCard />
            <HistoryList title="Recent Events" />
        </Fragment>
    );
}
