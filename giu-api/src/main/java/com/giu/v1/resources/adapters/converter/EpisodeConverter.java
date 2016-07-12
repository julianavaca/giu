package com.turner.v1.resources.adapters.converter;

import com.turner.domain.ChapterVO;
import com.turner.domain.Episode;
import org.springframework.stereotype.Component;

/**
 * Created by biandra on 17/02/16.
 */
@Component
public class EpisodeConverter {

    public Episode convert(String id) {
        Episode episode = new Episode();
        episode.setId(id);
        return episode;
    }

    public Episode convert(ChapterVO chapterVO) {
        Episode episode = convert(chapterVO.getMdeNroEpisode());
        episode.setElements(chapterVO.getMdeEpiEle());
        return episode;
    }
}
