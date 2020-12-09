import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'

import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

const useStyles = makeStyles(theme => ({
  passengerButton: { padding: theme.spacing(0.5), minWidth: 0 },
  itemContainer: { marginBottom: theme.spacing(3) }
}))

function GetTicketPassengerDialog({ open, setOpen, adults, setAdults, kids, setKids }) {
  const classes = useStyles()

  const handleClose = () => {
    setOpen(false)
  }

  function decreaseAdults() {
    setAdults([...adults.slice(0, adults.length - 1)])
  }

  function increaseAdults() {
    setAdults([...adults, ''])
  }

  function decreasekids() {
    setKids([...kids.slice(0, kids.length - 1)])
  }

  function increasekids() {
    setKids([...kids, ''])
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogContent>
        <Grid container direction="column">
          <Grid item className={classes.itemContainer}>
            <Grid container alignItems="center" justify="space-between">
              <Typography style={{ marginRight: '12px' }}>Adults</Typography>
              <Grid item>
                <Grid container alignItems="center">
                  <Button
                    disabled={adults.length < 2}
                    variant="outlined"
                    className={classes.passengerButton}
                    onClick={decreaseAdults}
                  >
                    <RemoveIcon />
                  </Button>
                  <Typography style={{ margin: '0 12px' }}>{adults.length}</Typography>
                  <Button
                    variant="outlined"
                    className={classes.passengerButton}
                    onClick={increaseAdults}
                  >
                    <AddIcon />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container alignItems="center">
              <Typography style={{ marginRight: '12px' }}>Children</Typography>
              <Grid item>
                <Grid container alignItems="center">
                  <Button
                    disabled={kids.length === 0}
                    variant="outlined"
                    className={classes.passengerButton}
                    onClick={decreasekids}
                  >
                    <RemoveIcon />
                  </Button>
                  <Typography style={{ margin: '0 12px' }}>{kids.length}</Typography>
                  <Button
                    variant="outlined"
                    className={classes.passengerButton}
                    onClick={increasekids}
                  >
                    <AddIcon />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  )
}

GetTicketPassengerDialog.propTypes = {
  kids: PropTypes.array,
  adults: PropTypes.array,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  setAdults: PropTypes.func,
  setKids: PropTypes.func
}

export default GetTicketPassengerDialog
