import {TooltipProps, TooltipPayload} from 'recharts';
import {FInterval} from './dateformat';
import Paper from '@material-ui/core/Paper';
import {Typography} from '@material-ui/core';
import moment from 'moment-timezone';
import prettyMs from 'pretty-ms';
import * as React from 'react';

export const TagTooltip = ({active, payload, dateFormat, total}: TooltipProps & {dateFormat: FInterval; total: boolean}) => {
    if (active && payload) {
        const first = payload[0];
        const start = dateFormat(moment(first.payload.start));
        const end = dateFormat(moment(first.payload.end));

        return (
            <Paper style={{padding: 10}} elevation={4}>
                {first && <Typography variant={'subtitle2'}>{start === end ? `${start}` : `${start} - ${end}`}</Typography>}
                {payload.map((entry) => (
                    <Typography key={entry.name}>
                        {entry.name}: {prettyMs((entry.payload.data[entry.name] as number) * 1000)}
                    </Typography>
                ))}
                {total ? (
                    <Typography>
                        Total:
                        {prettyMs(sum(payload) * 1000)}
                    </Typography>
                ) : (
                    undefined
                )}
            </Paper>
        );
    }

    return null;
};

const sum = (payload: readonly TooltipPayload[]): number =>
    payload.reduce((acc, entry) => (acc + entry.payload.data[entry.name]) as number, 0);
