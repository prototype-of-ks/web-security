import app from './app';
import express from 'express';

const api = createApiRouter();

app.use('/api', api);

app.get('/service/*', (req, res) => {
  res.json({
    data: { csrfToken: req.csrfToken() }
  });
});

app.get('/csrf/get', (req, res) => {
  const query = req.query;
  res.send('Congradulations! You have been attacked by CSRF!');
});

app.post('/csrf/post', (req, res) => {
  const body = req.body;
  const headers = req.headers;
  res.json({
    success: true,
    data: {
      data: {
        body,
        headers,
      }
    }
  });
});

function createApiRouter() {
  const router = express.Router();

  router.post('/getProfile', (req, res) => {
    // console.log(req.headers);
    res.json({
      success: true,
      data: {
        
      }
    });
  });

  return router;
}

app.listen(8080, () => console.log('Server start at 8080'.green));
