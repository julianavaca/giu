package com.turner.utils.conditions;

import java.io.Serializable;

/**
 * Created by gustavo on 06/04/16.
 */
public interface Condition extends Serializable {

    public String toSqlString();

}
