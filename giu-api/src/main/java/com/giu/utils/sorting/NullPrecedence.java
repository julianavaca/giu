package com.turner.utils.sorting;

/**
 * Created by gustavo on 08/04/16.
 */
public enum NullPrecedence {

    NONE, FIRST, LAST;

    public static NullPrecedence parse(String name){

        if("none".equalsIgnoreCase( name )){
          return NullPrecedence.NONE;
        } else if("first".equalsIgnoreCase( name )) {
            return NullPrecedence.FIRST;
        } else if("last".equalsIgnoreCase( name )) {
            return NullPrecedence.LAST;
        }

        return null;
    }

    public static NullPrecedence  parse(String name, NullPrecedence defaultValue) {


        final NullPrecedence value = parse( name );

        return value != null ? value : defaultValue;

    }
}
