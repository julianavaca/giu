package com.turner.v1.resources.adapters.command;

import java.util.List;

/**
 * Created by biandra on 28/03/16.
 */
public interface MediaMaterialsICommand {

    void execute(List<Object> mediaMaterialIdOrigin, List<Object> mediaMaterialIdDestination);

}
