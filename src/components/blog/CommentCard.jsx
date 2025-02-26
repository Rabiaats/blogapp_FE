import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  Avatar, 
  Typography, 
  // Box 
} from '@mui/material';
import { teal } from '@mui/material/colors';

function CommentCard({ comment}) {
  return (
    <Card sx={{width:{xs:"100%", sm:"90%"},
    m: 2,
    height:"fit-content",
    borderRadius: "1rem",
    padding:"0.5rem",
    bgcolor:teal[50],
    boxShadow:"0 0 5px 1px #657AB8"}}>
      <CardHeader
        avatar={
          <Avatar aria-label={comment.userId.username}>
            {comment.userId.username.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={comment.userId.username}
        subheader={comment.createdAt}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {comment.comment}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CommentCard