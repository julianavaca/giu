package com.turner.v1.resources.adapters.converter;

import com.turner.domain.COP;
import com.turner.domain.ChapterVO;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * Created by biandra on 18/05/16.
 */
@Component
public class COPConverter {

    public COP convert(ChapterVO chapterVO) {
        COP cop = null;
        if (Optional.ofNullable(chapterVO.getRvMeaning()).isPresent()){
            cop = new COP();
            cop.setId(chapterVO.getMdeClasifProduction());
            cop.setDescription(chapterVO.getRvMeaning());
        }
        return cop;
    }
}
