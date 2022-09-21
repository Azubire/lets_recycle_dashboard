import * as React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "../src/Link";
import ProTip from "../src/ProTip";
import Copyright from "../src/Copyright";
import Grid from "@mui/material/Grid";
import { Card, CardContent } from "@mui/material";

const About: NextPage = () => {
  const [state, setState] = React.useState(0);
  return (
    <Container maxWidth="lg">
      <Grid container spacing={0}>
        <Grid item lg>
          <Card>
            <CardContent>
              <Typography variant="body1" color="initial">
                Title
              </Typography>
              <Typography variant="body1" color="initial">
                Count
              </Typography>
              <Button variant="outlined" color="primary">
                View
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
