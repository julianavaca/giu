package com.turner.utils;

import com.turner.domain.Segment;
import com.turner.domain.TimeFrame;

import java.time.LocalTime;
import java.util.List;

/**
 * Created by biandra on 29/02/16.
 */
public class TimeFrameUtil {

    private TimeFrameUtil() {
        //We don't want to instantiate this class
    }

    public static TimeFrame getLength(TimeFrame timeFrame1, TimeFrame timeFrame2, Long maxFrames){
        if (timeFrame2.isAfter(timeFrame1)){
            return getDifference(timeFrame1, timeFrame2, maxFrames);
        } else {
            return getDifference(timeFrame2, timeFrame1, maxFrames);
        }
    }

    private static TimeFrame getDifference(TimeFrame timeFrameIn, TimeFrame timeFrameOut, Long maxFrames) {
        LocalTime time = LocalTime.of(timeFrameOut.getHour().intValue(), timeFrameOut.getMinute().intValue(), timeFrameOut.getSecond().intValue(), 0);
        time = time.minusHours(timeFrameIn.getHour());
        time = time.minusMinutes(timeFrameIn.getMinute());
        time = time.minusSeconds(timeFrameIn.getSecond());
        Long currentFrame;
        if (timeFrameOut.getFrame() - timeFrameIn.getFrame() >= 0){
            currentFrame = timeFrameOut.getFrame() - timeFrameIn.getFrame();
        } else {
            currentFrame = timeFrameOut.getFrame() + maxFrames - timeFrameIn.getFrame();
        }
        return new TimeFrame((long) time.getHour(), (long) time.getMinute(), (long) time.getSecond(), currentFrame);
    }

    public static boolean hasFramesValid(TimeFrame timeFrame, Long maxFrames){
        return timeFrame.getFrame() <= maxFrames;
    }

    public static TimeFrame getTimeFrameOut(TimeFrame in, TimeFrame length, Long maxFrame) {
        TimeFrame out = in.clone();
        out.plus(length, maxFrame);
        return out;
    }

    public static TimeFrame getSumLength(List<Segment> segments, Long maxFrame) {
        TimeFrame totalTimeFrame = new TimeFrame(0L,0L,0L,0L);

        segments
            .stream()
            .skip(1)
            .forEach(segment -> totalTimeFrame.plus(segment.getLength(), maxFrame));

        return totalTimeFrame;
    }

}
