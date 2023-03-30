import { isAfter, subSeconds } from "date-fns";

let allEvents = [];

const analytics = async (req, res) => {
    let events = req.body;
    try {
        const now = Date.now();
        const hasClickWithin3Secs = allEvents.filter(e => e.eventType === 'click').some((event) => {
            return isAfter(new Date(event.timestamp), subSeconds(new Date(now), 3));
        });
        const hasPageViewWithin5Secs = allEvents.filter(e => e.eventType === 'pageView').some((event) => {
            return isAfter(new Date(event.timestamp), subSeconds(new Date(now), 5));
        });
        const eventsToSave = events.reduce((acc, event) => {
            if (event.type === 'click' && hasClickWithin3Secs) return acc;
            if (event.type === 'pageView' && hasPageViewWithin5Secs) return acc;
            return [...acc, { ...event, timestamp: now, id: acc.length + 1 }];
        }, []);
        console.log({ hasClickWithin3Secs, hasPageViewWithin5Secs });
        allEvents.push(...eventsToSave);
        res.status(201).json({ ingested: eventsToSave.length });
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error: error, status: false });
    }
};

const get_analytics = async (req, res) => {
    try {
        res.status(200).json({ status: true, error: false, message: 'Success', data: allEvents });
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error: error, status: false });
    }
};

module.exports = { analytics, get_analytics };