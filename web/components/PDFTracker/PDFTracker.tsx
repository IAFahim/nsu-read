import { useWindowScroll } from '@mantine/hooks';
import { Button, Text, Group } from '@mantine/core';

export default function PDFTracker() {
    const [scroll, scrollTo] = useWindowScroll();

    return (
        <Group position="center">
            <Button onClick={() => scrollTo({ y: 0 })}>Scroll to top</Button>
        </Group>
    );
}