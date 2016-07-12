package com.turner.v1.resources.adapters.converter

import com.turner.domain.Chapter
import com.turner.domain.Episode
import com.turner.domain.MaterialMediaVO
import com.turner.domain.MediaMaterialVO
import com.turner.v1.resources.chapters.adapter.converter.ChapterConverter
import spock.lang.Specification

/**
 * Created by mbritez on 31/03/16.
 */
class ChapterConverterTests extends Specification {

    private ChapterConverter converter
    private EpisodeConverter mockedEpisodeConverter
    private DateConverter dateConverter
    private COPConverter copConverter

    def setup(){
        mockedEpisodeConverter = Mock(EpisodeConverter)
        dateConverter = Mock(DateConverter)
        copConverter = Mock(COPConverter)
        converter = new ChapterConverter(mockedEpisodeConverter,
                dateConverter,
                copConverter)
    }

    def "test convert from MediaMaterialVO"(){
        setup:
        def mockedMediaMaterialVO = Mock(MediaMaterialVO){
            getMdeCodigo() >> 1
            getMdeTituloOrigen() >> "aTitle"
            getMdeNroEpisode() >> "2"
        }
        def mockedEpisode = Mock(Episode)
        mockedEpisodeConverter.convert("2") >> mockedEpisode

        when:
        Chapter result = converter.convert(mockedMediaMaterialVO)

        then:
        result != null
        result.id == mockedMediaMaterialVO.getMdeCodigo()
        result.title == mockedMediaMaterialVO.getMdeTituloOrigen()
        result.episode != null
        result.episode == mockedEpisode
    }

    def "test null mde codigo"(){
        setup:
        def mockedMediaMaterialVO = Mock(MediaMaterialVO){
            getMdeCodigo() >> null
        }

        when:
        Chapter result = converter.convert(mockedMediaMaterialVO)

        then:
        result == null
    }

    def "test convert from MaterialMediaVO"(){
        setup:
        def mockedMaterialMediaVO = Mock(MaterialMediaVO){
            getMdeCodigo() >> 1
            getMdeTituloOrigen() >> "aTitle"
            getMdeNroEpisode() >> "2"
        }
        def mockedEpisode = Mock(Episode)
        mockedEpisodeConverter.convert("2") >> mockedEpisode

        when:
        Chapter result = converter.convert(mockedMaterialMediaVO)

        then:
        result != null
        result.id == mockedMaterialMediaVO.getMdeCodigo()
        result.title == mockedMaterialMediaVO.getMdeTituloOrigen()
        result.episode != null
        result.episode == mockedEpisode
    }



    }



