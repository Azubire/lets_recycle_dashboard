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
import { baseUrl } from "../../src/utils";

interface Data {
  id: string;
  companyName: string;
  about: string;
  profile: string;
  workingHours: string;
  location: string;
  profileImg: string;
  isVerified: boolean;
}

const Index = () => {
  const [show, setShow] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    icon: undefined,
  });
  const [preview, setPreview] = React.useState<string | undefined>(undefined);

  const [loading, setLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [data, setData] = React.useState<Data[]>([]);

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
    if (formData.icon && formData.name) {
      const data = new FormData();
      data.append("icon", formData.icon);
      data.append("name", formData.name);

      const response = await fetch(
        `${baseUrl}/admin/recycling/category/create`,
        {
          method: "POST",
          body: data,
        }
      );
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
    const response = await fetch(`${baseUrl}/recyclers`);

    const data = await response.json();
    console.log(data);
    if (data.data) {
      setData(data.data);
    }
    setLoading(false);
  };

  // delete
  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const data = await fetch(`${baseUrl}/recyclers/delete/${id}`, {
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
          {/* hearder  */}
          <Grid container spacing={0} mb={10} justifyContent="space-between">
            <Box>
              <Typography variant="h5" color="initial">
                Recyclers
              </Typography>
            </Box>
            <Box>
              {/* <Button
                variant="outlined"
                color="primary"
                onClick={() => setShow(true)}
              >
                Add New Category
              </Button> */}
            </Box>
          </Grid>
          {/* section  */}
          <Grid
            container
            spacing={0}
            // flex="column"
          >
            {loading ? (
              <Typography>Loading...</Typography>
            ) : data ? (
              <Table>
                <TableHead>
                  <TableCell>#</TableCell>
                  <TableCell>Cover Image</TableCell>
                  <TableCell>Company Name</TableCell>
                  <TableCell>About</TableCell>
                  <TableCell>Working Hours</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Verified</TableCell>
                  <TableCell>Options</TableCell>
                </TableHead>
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <>
                      <TableBody>
                        <TableCell>{index}</TableCell>
                        <TableCell>
                          <Image
                            src={`${baseUrl}/images/recyclers/${item.profileImg}`}
                            height={50}
                            width={50}
                            objectFit="cover"
                          />
                        </TableCell>
                        <TableCell>{item.companyName}</TableCell>
                        <TableCell>{item.about}</TableCell>
                        <TableCell>{item.workingHours}</TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell>
                          {item.isVerified ? "Verified" : "Not Verified"}
                        </TableCell>
                        <TableCell>
                          <Grid container spacing={1}>
                            {/* <Grid item>
                            <IconButton>
                              <Edit color="info" />
                            </IconButton>
                          </Grid> */}
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
                  ))
                ) : (
                  <Typography>Loading...</Typography>
                )}
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
