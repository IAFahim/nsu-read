import {forwardRef, useEffect} from 'react';
import { MultiSelect, Avatar, Group, Text } from '@mantine/core';

const data = [
    {
        image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
        label: 'Bender Bending Rodríguez',
        value: 'Bender Bending Rodríguez',
        description: 'Fascinated with cooking',
    },

    {
        image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
        label: 'Carol Miller',
        value: 'Carol Miller',
        description: 'One of the richest people on Earth',
    },
    {
        image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
        label: 'Homer Simpson',
        value: 'Homer Simpson',
        description: 'Overweight, lazy, and often ignorant',
    },
    {
        image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
        label: 'Spongebob Squarepants',
        value: 'Spongebob Squarepants',
        description: 'Not just a sponge',
    },
];

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    image: string;
    label: string;
    description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ image, label, description, ...others }: ItemProps, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                <Avatar src={image} />

                <div>
                    <Text>{label}</Text>
                    <Text size="xs" color="dimmed">
                        {description}
                    </Text>
                </div>
            </Group>
        </div>
    )
);

export default function FindPeople() {

    useEffect(() => {
        async function fetchUsers() {

        }
    },[])

    return (
        <MultiSelect
            label="Add people by Username, Email, Group Name"
            placeholder="Pick all you like"
            itemComponent={SelectItem}
            data={data}
            searchable
            nothingFound="Nobody here"
            maxDropdownHeight={400}
            filter={(value, selected, item) =>
                !selected &&
                (item.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
                    item.description.toLowerCase().includes(value.toLowerCase().trim()))
            }
        />
    );
}