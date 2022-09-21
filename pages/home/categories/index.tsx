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
  Avatar,
  IconButton,
  CardContent,
  FormControlLabel,
  TextField,
  FormControl,
  InputLabel,
  FormGroup,
  Input,
  Table,
  TableHead,
  TableBody,
  TableCell,
  fabClasses,
} from "@mui/material";
import { GetServerSideProps } from "next";
import Image from "next/image";
import React from "react";
import { baseUrl } from "../../../src/utils";

interface Data {}

const Index = () => {
  const [show, setShow] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: "",
    screen: "",
    icon: undefined,
  });
  const [preview, setPreview] = React.useState<string | undefined>(undefined);

  const [loading, setLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [data, setData] = React.useState<
    Array<{ id: string; title: string; screen: string; icon: string }>
  >([]);

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, icon: file }));
    console.log(file);
  };

  // image preview
  React.useEffect(() => {
    if (!formData.icon) {
      return;
    }
    const previewImg = URL.createObjectURL(formData.icon);
    setPreview(previewImg);
    return () => {
      URL.revokeObjectURL(previewImg);
    };
  }, [formData.icon]);

  const submitData = async () => {
    setLoading(true);
    setShow(false);
    if (formData.icon && formData.title && formData.screen) {
      const data = new FormData();
      data.append("avatar", formData.icon);
      data.append("title", formData.title);
      data.append("screen", formData.screen);
      // console.log("before", data.get("avatar"));

      // const response = await fetch("${baseUrl}/home/categories");
      const response = await fetch(`${baseUrl}/admin/category/create`, {
        method: "POST",
        body: data,
      });
      const dat = await response.json();
      if (dat) {
        setLoading(false);
        setRefresh(!refresh);
      }
      console.log("res", dat);
    }
  };

  // fetch category
  const getCat = async () => {
    setLoading(true);
    const response = await fetch(`${baseUrl}/admin`);

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
      const data = await fetch(`${baseUrl}/admin/category/delete/${id}`, {
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
                  <FormGroup>
                    <InputLabel>Title</InputLabel>
                    <TextField
                      value={formData.title}
                      title="Title"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="Enter category name"
                    />
                  </FormGroup>
                  <FormGroup>
                    <InputLabel>Title</InputLabel>
                    <TextField
                      value={formData.screen}
                      title="Screen"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          screen: e.target.value,
                        }))
                      }
                      placeholder="Enter category name"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="file"
                      name="icon"
                      onChange={(e) => handleFile(e)}
                    />
                  </FormGroup>
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
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={submitData}
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Modal>
          {/* hearder  */}
          <Grid container spacing={0} mb={10} justifyContent="space-between">
            <Box>
              <Typography variant="h5" color="initial">
                Categories
              </Typography>
            </Box>
            <Box>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setShow(true)}
              >
                Add New Category
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
                  <TableCell>Icon</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Screen</TableCell>
                  <TableCell>Options</TableCell>
                </TableHead>
                {data.map((item, index) => (
                  <>
                    <TableBody>
                      <TableCell>{index}</TableCell>
                      <TableCell>
                        <Image
                          src={`${baseUrl}/images/categoryImages/${item.icon}`}
                          height={50}
                          width={50}
                          objectFit="cover"
                        />
                      </TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.screen}</TableCell>
                      <TableCell>
                        <Grid container spacing={1}>
                          <Grid item>
                            <IconButton>
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
                  </>
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

// export const getServerSideProps:GetServerSideProps = (ctx)=>{

//   return {
//     props:{}
//   }
// }
