package com.turner.v1.resources.adapters.converter

import com.turner.domain.ChapterVO
import spock.lang.Specification

/**
 * Created by martin on 18/05/16.
 */
class COPConverterTests extends Specification {

    public static final String ID = "id"
    public static final String DESCRIPTION = "description"
    private COPConverter converter

    def setup(){
        this.converter = new COPConverter()
    }

    def "Test COPConverter"(){
        setup:
        ChapterVO chapterVO = Mock(){
            getRvMeaning() >> DESCRIPTION
            getMdeClasifProduction() >> ID
        }

        when:
        def result = converter.convert(chapterVO)

        then:
        result.getId() == ID
        result.getDescription() == DESCRIPTION

    }

    def "Test COPConverter if is null"(){
        setup:
        ChapterVO chapterVO = Mock(){
            getRvMeaning() >> null

        }

        when:
        def result = converter.convert(chapterVO)

        then:
        !result

    }
}
