import { Fragment } from "react";
import Head from "next/head";
import { Heading, Flex, Box } from "rebass";
import ReviewArea from "~/components/review-area";
import EventInput from "~/components/event-input";
import HistoryList from "~/components/history-list";
import InfoCard from "~/components/info-card";
import MainMenu from "~/components/main-menu";

export default function Index() {
    return (
        <Fragment>
            <Head>
                <title>{process.env.settings.title}</title>
                <link
                    rel="shortcut icon"
                    href="/favicon.ico"
                    type="image/x-icon"
                />
            </Head>
            <Flex my={2} pb={2} alignItems="center" flexWrap="wrap" >
                <Box width={[1, 1 / 2]} pb={[3, 1]}>
                    <Heading variant="h1" textAlign={["center","left"]}>{process.env.settings.title}</Heading>
                </Box>
                <Box width={[1, 1 / 2]}>
                    <MainMenu />
                </Box>
            </Flex>
            <Flex my={3}>
                <Box width={1}>
                    <EventInput />
                </Box>
            </Flex>
            <ReviewArea />
            <InfoCard />
            <HistoryList title="Try these examples:" />
        </Fragment>
    );
}
