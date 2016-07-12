package com.turner.v1.resources.adapters.converter

import com.turner.domain.Chapter
import com.turner.domain.ChapterVO
import com.turner.domain.Episode
import com.turner.domain.MaterialMediaVO
import com.turner.domain.MediaMaterialVO
import spock.lang.Specification

/**
 * Created by mbritez on 31/03/16.
 */
class EpisodeConverterTests extends Specification {

    private EpisodeConverter converter

    def setup(){
        converter = new EpisodeConverter()
    }

    def "test convert"(){
        setup:
        ChapterVO chapterVO = Mock(){
        getMdeNroEpisode() >> "String"
        getMdeEpiEle()>> "Some"

        }
        when:
        Episode result = converter.convert("1234-43")
        def  result2 = this.converter.convert(chapterVO)

        then:
        result2.getId() == "String"
        result2.getElements() == "Some"
        result != null
        result.id.class == String.class
    }

}
