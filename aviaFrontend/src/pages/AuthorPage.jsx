import React from "react";
import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Chip,
  TextareaAutosize,
} from "@mui/material";
import { Box } from "@mui/system";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useSelector, useDispatch } from "react-redux";
import {
  addPost,
  addTagHandler,
  deleteTagHandler,
  inputContentHandler,
  inputTagsHandler,
  inputTitleHandler,
  setImagePath,
} from "../redux/slices/adminPanelSlice";
import { useTitle } from "./../Hooks/useTitle";
const AuthorPage = () => {
  useTitle("Добавить Запись");
  const {
    tagInputValue,
    tags,
    titleInputValue,
    imagePath,
    content,
    postImage,
  } = useSelector((state) => state.adminPanel);
  const dispatch = useDispatch();
  const addTagsToList = (e) => {
    if (e.keyCode == 13) {
      dispatch(addTagHandler());
    }
  };
  const fileInputHandler = (e) => {
    let file = e.target.files[0];

    let reader = new FileReader();
    const handleEvent = (evt) => {
      if (evt.type === "load") {
        dispatch(setImagePath({ file: reader.result }));
      }
    };
    function addListeners(reader) {
      reader.addEventListener("loadstart", handleEvent);
      reader.addEventListener("load", handleEvent);
      reader.addEventListener("loadend", handleEvent);
      reader.addEventListener("progress", handleEvent);
      reader.addEventListener("error", handleEvent);
      reader.addEventListener("abort", handleEvent);
    }

    addListeners(reader);
    reader.readAsDataURL(file);
  };
  return (
    <Box marginY={10} paddingY={5}>
      <Container mt={4} maxWidth="xxl">
        <Stack direction={"column"} spacing={3}>
          <Stack spacing={2} sx={{ maxWidth: "30%" }}>
            <Typography variant="h2" component={"h2"}>
              Заголовок рассказа
            </Typography>
            <TextField
              id="outlined-basic"
              value={titleInputValue}
              onChange={(e) =>
                dispatch(inputTitleHandler({ value: e.target.value }))
              }
              label="Название"
              variant="outlined"
            />
          </Stack>
          <Box>
            <Typography variant="h4" sx={{ marginBottom: 3 }} component={"h4"}>
              Изображение статьи
            </Typography>
            {postImage && (
              <img
                src={`${postImage}`}
                style={{
                  objectFit: "contain",
                  display: "block",
                  margin: "10px 0px",
                  borderRadius: "10px",
                }}
                width={150}
                height={100}
                alt=""
              />
            )}

            <Button variant="contained" component="label">
              Загрузить изображение
              <input
                hidden
                accept="image/.jpg"
                onChange={(e) => {
                  fileInputHandler(e);
                }}
                type="file"
              />
            </Button>
          </Box>
          <Box>
            <Typography sx={{ marginBottom: 2 }} variant="h4" component={"h4"}>
              Теги
            </Typography>
            <TextField
              id="outlined-basic"
              value={tagInputValue}
              onChange={(e) =>
                dispatch(
                  inputTagsHandler({ value: e.target.value.replace(" ", "") })
                )
              }
              onKeyDown={addTagsToList}
              label="Теги"
              variant="outlined"
            />
            <Stack
              direction={"row"}
              spacing={1}
              sx={{
                paddingY: 2,
                flexWrap: "wrap",
                minHeight: "64px",
                maxWidth: "368px",
              }}
            >
              {tags.map((item, idx) => (
                <Chip
                  variant="outlined"
                  key={idx}
                  label={`# ${item}`}
                  onDelete={() => dispatch(deleteTagHandler({ id: idx }))}
                />
              ))}
            </Stack>
          </Box>
        </Stack>

        <Box>
          <TextareaAutosize
            aria-label="minimum height"
            value={content}
            onChange={(e) => dispatch(inputContentHandler(e.target.value))}
            placeholder="Начните писать"
            style={{
              resize: "none",
              marginBottom: 5,
              width: "100%",
              height: "800px",
              padding: "10px",
              border: "1px solid blue",
              fontSize: "1.5rem",
            }}
          />
          <Button variant="contained" onClick={() => dispatch(addPost())}>
            Опубликовать
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default AuthorPage;
