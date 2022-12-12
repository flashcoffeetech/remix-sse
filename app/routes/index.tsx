import * as React from 'react';

const url = 'http://localhost:3001/api/event';
const weatherUrl = 'http://localhost:3001/api/weather';
const todoUrl = 'http://localhost:3001/api/todo?id=1';
export default function Index() {
  const [value, setValue] = React.useState('')
  const [weather, setWeather] = React.useState('')
  const [todo, setTodo] = React.useState<any>({})

  if(typeof(EventSource) !== "undefined") {
    // Yes! Server-sent events support!
    // Some code.....
  } else {
    // Sorry! No server-sent events support..
  }

  React.useEffect(() => {
    const source = new EventSource(url)
    source.addEventListener('open', () => {
      console.log('SSE opened!');
    });

    source.addEventListener('message', ({data}) => {
      setValue(data);
      source.close();
    });

    source.addEventListener('error', (e) => {
      console.log("EventSource failed.");
    });

    return () => {
      source.close();
    };
  }, [])

  React.useEffect(() => {
    const source = new EventSource(weatherUrl)
    source.addEventListener('open', () => {
      console.log('SSE weather opened!');
    });

    source.addEventListener('message', ({data}) => {
      setWeather(data);
      source.close();
    });

    source.addEventListener('error', (e) => {
      console.log("EventSource weather failed.");
    });

    return () => {
      source.close();
    };
  }, [])

  React.useEffect(() => {
    const source = new EventSource(todoUrl)
    source.addEventListener('open', () => {
      console.log('SSE todo opened!');
    });

   source.addEventListener('todo', function(e) {
      const obj = JSON.parse(e.data);
      console.log(e);
      console.log("todo", e.data)
      setTodo(obj);
    });

    return () => {
      source.close();
    };
  }, [])

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
      <h1>NEW VALUE : {value}</h1>
      <h1>WEATHER : {weather}</h1>
      <h1>TODO {todo?.title} {todo?.description}</h1>
    </div>
  );
}
