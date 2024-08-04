"use client";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  TextField,
  Card,
  CardContent,
  CardActions,
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Paper,
  Fade,
  Snackbar,
} from "@mui/material";
import { Add, Remove, Search, Close } from "@mui/icons-material";
import { firestore } from "@/firebase.js";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#fafafa",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 15,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: "#fff",
        },
      },
    },
  },
});

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
    setSnackbarMessage("Item added successfully");
    setSnackbarOpen(true);
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
    setSnackbarMessage("Item removed successfully");
    setSnackbarOpen(true);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addItem(itemName);
      setItemName("");
      handleClose();
    }
  };

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        width="100vw"
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        sx={{
          background: "linear-gradient(to right, black, #4a00e0)",
        }}
      >
        <AppBar position="static" sx={{ mb: 4, bgcolor: "black" }}>
          <Toolbar>
            <Box
              sx={{
                background: "linear-gradient(to right, #8e2de2, #4a00e0)",
                padding: "8px 16px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "30%", // Reduced width
                mx: "auto", // Center the Box horizontally
              }}
            >
              <Typography variant="h6" sx={{ color: "white" }}>
                Inventory Items
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            sx={{ bgcolor: "black", padding: 2, borderRadius: 4 }} // Set the box color to black
          >
            <Modal
              open={open}
              onClose={handleClose}
              closeAfterTransition
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Fade in={open}>
                <Box sx={modalStyle}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Add Item
                  </Typography>
                  <Stack width="100%" direction="row" spacing={2}>
                    <TextField
                      id="outlined-basic"
                      label="Item"
                      variant="outlined"
                      fullWidth
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        addItem(itemName);
                        setItemName("");
                        handleClose();
                      }}
                      sx={{
                        borderRadius: "50px",
                      }}
                    >
                      Add
                    </Button>
                  </Stack>
                </Box>
              </Fade>
            </Modal>
            <TextField
              id="search-bar"
              label="Search"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ marginBottom: 2, maxWidth: "600px" }}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <Search />
                  </IconButton>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpen}
              sx={{ marginBottom: 2, borderRadius: "50px" }}
            >
              Add New Item
            </Button>
            <Paper
              elevation={3}
              sx={{
                width: "100%",
                borderRadius: 4,
                padding: 2,
                bgcolor: "black", // Set the background color of the box containing the cards to black
                marginBottom: 2,
              }}
            >
              <Box
                width="100%"
                bgcolor="linear-gradient(to right, #8e2de2, #4a00e0)"
                padding={2}
                borderRadius="8px 8px 0 0"
              >
                <Typography variant="h4" color="#fff" textAlign="center">
                  Inventory Items
                </Typography>
              </Box>
              <Stack width="100%" spacing={2} padding={2}>
                {filteredInventory.length > 0 ? (
                  filteredInventory.map(({ name, quantity }) => (
                    <Card
                      key={name}
                      sx={{
                        background: "linear-gradient(to right, black, #4a00e0)", // Set the card background to the gradient
                        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6" color="#fff">
                          {name.charAt(0).toUpperCase() + name.slice(1)}
                        </Typography>
                        <Typography variant="body1" color="#fff">
                          Quantity: {quantity}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          variant="contained"
                          color="secondary"
                          startIcon={<Remove />}
                          onClick={() => removeItem(name)}
                          sx={{
                            borderRadius: "20px",
                          }}
                        >
                          Remove
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<Add />}
                          onClick={() => addItem(name)}
                          sx={{
                            borderRadius: "20px",
                          }}
                        >
                          Add
                        </Button>
                        </CardActions>
                    </Card>
               ))
                ) : (
                  <Typography variant="h6" color="textSecondary" textAlign="center">
                    No items found
                  </Typography>
                )}
              </Stack>
            </Paper>
          </Box>
        </Container>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
          action={
                        <>
                          <Button color="secondary" size="small" onClick={handleSnackbarClose}>
                            Close
                          </Button>
                          <IconButton size="small" color="inherit" onClick={handleSnackbarClose}>
                            <Close fontSize="small" />
                          </IconButton>
                        </>
                      }
                    />
                  </Box>
                </ThemeProvider>
              )
            }