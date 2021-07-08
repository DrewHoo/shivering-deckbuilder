import React, { useState } from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'

import { VizDisplayer } from '../VizBuilder/VizBuilder'
import { LabeledSelect } from '../components/LabeledSelect'
import { Filters } from './Filters'
import { ChartTypeOptions, Dimensions, Segments } from './constants'
import SimpleCard from '../Card'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  formGroup: { display: 'flex', justifyContent: 'space-between' },
  simpleCard: { display: 'flex', flexDirection: 'row' },
  select: {
    margin: theme.spacing(2)
  }
}))
export function CustomizableGraph () {
  const classes = useStyles()
  const [filters, setFilters] = useState([])
  const [dimension, setDimension] = useState('Magicka Cost')
  const [segment, setSegment] = useState('None')
  const [chartType, setChartType] = useState('Bar')
  const [searchTextFilter, setSearchTextFilter] = useState(null)

  return (
    <SimpleCard className={classes.simpleCard} title={'Customizable Graph'}>
      <Grid container spacing={1} direction='row' justify='center'>
        <Grid item xs={3} sm={4}>
          <FormGroup className={classes.formGroup}>
            <LabeledSelect
              className={classes.select}
              id='viz-chart-type'
              selectName='Chart Type'
              value={chartType}
              onChange={setChartType}
              menuOptions={ChartTypeOptions}
            />
            <LabeledSelect
              className={classes.select}
              id='viz-dimension'
              selectName='Dimension'
              value={dimension}
              onChange={setDimension}
              menuOptions={Dimensions}
            />
            {chartType === 'Bar' && (
              <LabeledSelect
                className={classes.select}
                id='viz-segment'
                selectName='Segment'
                value={segment}
                onChange={setSegment}
                menuOptions={Segments}
              />
            )}
            <Divider variant='middle' flexItem />
            <Divider flexItem />
            <Filters
              filters={filters}
              setFilters={setFilters}
              searchTextFilter={searchTextFilter}
              setSearchTextFilter={setSearchTextFilter}
              chartType={chartType}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={9} sm={8}>
          <VizDisplayer
            searchTextFilter={searchTextFilter}
            chartType={chartType}
            query={{
              dimension,
              filters,
              segment
            }}
          />
        </Grid>
      </Grid>
    </SimpleCard>
  )
}
