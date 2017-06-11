topojson > us2016.topo.json \
    -q 5000 \
    -s 0.00000008 \
        states=cb_2016_us_state_500k/cb_2016_us_state_500k.shp \
            --id-property GEOID \
        counties=cb_2016_us_county_500k/cb_2016_us_county_500k \
            --id-property GEOID

