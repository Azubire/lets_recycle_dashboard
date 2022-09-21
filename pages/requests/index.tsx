import { Close, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Modal,
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Table,
  TableHead,
  TableBody,
  TableCell,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { baseUrl } from "../../src/utils";

interface Data {
  id: string;
  userId: string;
  adId: string;
  status: number;
}

const Index = () => {
  const [show, setShow] = React.useState(false);

  const [preview, setPreview] = React.useState<string | undefined>(undefined);

  const [loading, setLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [data, setData] = React.useState<Data[]>([]);

  // fetch category
  const getCat = async () => {
    setLoading(true);
    const response = await fetch(`${baseUrl}/requests`);

    const data = await response.json();
    console.log(data);
    if (data.data) {
      setData(data.data);
    }
    setLoading(false);
  };

  // delete
  const handleDelete = async (id: string) => {
    try {
      const data = await fetch(`${baseUrl}/requets/delete/${id}`, {
        method: "DELETE",
      });

      console.log(await data.json());
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    console.log("mouted");
    getCat();
  }, [refresh]);

  return (
    <>
      <Box>
        <Container maxWidth="lg">
          {/* modal  */}
          <Modal
            sx={{ display: "flex", justifyContent: "center" }}
            // hideBackdrop
            open={show}
            onClose={() => setShow(false)}
          >
            <Card variant="outlined" sx={{ width: "40%" }}>
              <CardHeader
                action={
                  <IconButton aria-label="" onClick={() => setShow(false)}>
                    <Close />
                  </IconButton>
                }
                title="Add New Category"
              />
              <CardContent>
                <Box component="form">
                  <Box>
                    {preview && (
                      <Image
                        height={100}
                        width={100}
                        objectFit="cover"
                        src={preview}
                      />
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Modal>
          {/* hearder  */}
          <Grid container spacing={0} mb={10} justifyContent="space-between">
            <Box>
              <Typography variant="h5" color="initial">
                Request
              </Typography>
            </Box>
            <Box>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setShow(true)}
              >
                Go to adverts
              </Button>
            </Box>
          </Grid>
          {/* section  */}
          <Grid
            container
            spacing={0}
            // flex="column"
          >
            {data.length > 0 ? (
              <Table>
                <TableHead>
                  <TableCell>#</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Recycler</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Options</TableCell>
                </TableHead>
                {data.map((item, index) => (
                  <TableBody key={index}>
                    <TableCell>{index}</TableCell>

                    <TableCell>{item.userId}</TableCell>
                    <TableCell>{item.adId}</TableCell>
                    <TableCell>
                      {item.status == 0 ? "Pending" : "Completed"}
                    </TableCell>
                    <TableCell>
                      <Grid container spacing={1}>
                        <Grid item>
                          <IconButton onClick={() => {}}>
                            <Edit color="info" />
                          </IconButton>
                        </Grid>
                        <Grid item>
                          <IconButton
                            onClick={() => handleDelete(item.id.toString())}
                          >
                            <Delete color="error" />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableBody>
                ))}
              </Table>
            ) : (
              <Typography variant="body1" color="initial">
                No data to show
              </Typography>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Index;
