import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const SearchItemDetail = (props) => {
  const { item, onViewDetailsClick } = props;
  const classes = useStyles();

  return (
    <div className="h-full">
      <Card className={classes.root + " h-full"}>
        <CardContent>
          <Typography variant="h6" component="h2">
            {item.title}
          </Typography>

          <div className="flex justify-center">
            <img className="h-52" alt="avatar" src={item.thumbnail}></img>
          </div>

          { item.original_price &&  <Typography className="line-through" variant="body1" component="p">
           ${ item.original_price }
          </Typography> }
         
          <Typography variant="body1" component="p">
           ${ item.price }
          </Typography>

        </CardContent>
        <CardActions>
          <Button size="small" onClick={onViewDetailsClick()} >Ver Detalles</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default SearchItemDetail;
