import React, { useEffect, useState } from "react";

// HOOKS
import { useObservable } from "rxjs-hooks";

// SERVICES
import APIRest from "../../../Services/apiRest";
import { BehaviorSubject, defer } from "rxjs";
import { map, mergeMap, tap } from "rxjs/operators";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import { useHistory } from "react-router-dom";

const onSearch$ = new BehaviorSubject("");

const useStyles = makeStyles({
  media: {
    // height: 140,
  },
});

const ItemDetailComponent = (props) => {
  const { match } = props;
  const history = useHistory();

  const [ApiService] = useState(APIRest());

  //
  const itemResult = useObservable(() =>
    onSearch$.pipe(
      mergeMap(() => defer(() => ApiService.get(`/items/${match.params.id}`))),
      map((response) => response.data),
      tap((text) => console.log("onSearch$ --- RESULT", text))
    )
  );

  useEffect(() => {
    //   onSearch$.next('');
  }, []);

  function handleGoToBuyItem(url) {
    history.push(url);
  }

  return (
    <div className="p-2 flex justify-center">
      {itemResult && (
        <Card>
          <CardActionArea>
            <div className="flex justify-center">
              <img
                className="h-52"
                alt="avatar"
                src={itemResult.pictures[0].secure_url}
              ></img>
            </div>

            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {itemResult.title}
              </Typography>
              {itemResult.attributes.map((att) => {
                return (
                  <div key={att.id}>
                    <span className="font-bold">{att.name}: </span>
                    <span>{att.value_name}: </span>
                  </div>
                );
              })}
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link href={itemResult.permalink}>
              Ir a comprar de verdad
            </Link>
          </CardActions>
        </Card>
      )}
    </div>
  );
};

export default ItemDetailComponent;
