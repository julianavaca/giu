package com.turner.utils.sorting;


import java.util.Locale;

/**
 * Created by gustavo on 08/04/16.
 */
public class Order implements SortingElement {

    private static NullPrecedence ORACLE_DEFAULT_PRECEDENCE_ASCENDING = NullPrecedence.LAST;
    private static NullPrecedence ORACLE_DEFAULT_PRECEDENCE_DESCENDING = NullPrecedence.FIRST;
    private static boolean ORACLE_DEFAULT_ASCENDING_ORDER = true;

    /**
     * Property could be a fieldName or a field order starting from 1 for the first field
     * in the query
     */

    private String property;

    private boolean ascending;

    private boolean ignoreCase;

    private NullPrecedence nullPrecedence;

    public Order( String propertyName ){

        this.ascending = ORACLE_DEFAULT_ASCENDING_ORDER;
        this.nullPrecedence= ORACLE_DEFAULT_PRECEDENCE_ASCENDING;
        this.property = propertyName;

    }


    public Order( String propertyName, boolean ascending, NullPrecedence nullPrecedence ){

        this.property = propertyName;
        this.ascending = ascending;
        this.nullPrecedence = nullPrecedence;

    }

    public static Order  asc(String propertyName) {

        return new Order( propertyName, true , ORACLE_DEFAULT_PRECEDENCE_ASCENDING);
    }

    public static Order  desc(String propertyName) {

        return new Order( propertyName, false , ORACLE_DEFAULT_PRECEDENCE_DESCENDING);
    }

    public Order ignoreCase() {

        this.ignoreCase = true;

        return this;

    }

    public Order nulls(NullPrecedence nullPrecedence) {

        this.nullPrecedence = nullPrecedence;

        return this;

    }

    @Override
    public String  toSqlString() {

        return this.toString();
    }

    @Override
    public String toString() {

        return property + ' '
                + ( ascending ? "asc" : "desc" )
                + " nulls " + ( nullPrecedence != null ? ' ' + nullPrecedence.name().toLowerCase(Locale.ROOT) : "" );

    }


}
