import React, {useEffect, useState} from "react";
import {Responsive, WidthProvider} from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import FavoritesPanel from "@/components/panels/favoritesPanel";
import EmailsPanel from "@/components/panels/emailsPanel";
import TaskPanel from "@/components/panels/taskPanel";
import NotesPanel from "@/components/panels/notesPanel";
import styles from '@/styles/grid.module.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const TileLayout = ({settings}) => {

  const defaultLayouts = {
    lg: [{i: "a", x: 0, y: 0, w: 2, h: 1}, {i: "b", x: 2, y: 0, w: 3, h: 1}, {i: "c", x: 0, y: 1, w: 3, h: 1}, {
      i: "d",
      x: 3,
      y: 1,
      w: 2,
      h: 1
    },],
    md: [{i: "a", x: 0, y: 0, w: 2, h: 1}, {i: "b", x: 2, y: 0, w: 2, h: 1}, {i: "c", x: 0, y: 1, w: 2, h: 1}, {
      i: "d",
      x: 2,
      y: 1,
      w: 2,
      h: 1
    },],
    sm: [{i: "a", x: 0, y: 0, w: 1, h: 1}, {i: "b", x: 1, y: 0, w: 1, h: 1}, {i: "c", x: 0, y: 1, w: 1, h: 1}, {
      i: "d",
      x: 1,
      y: 1,
      w: 1,
      h: 1
    },],
    xs: [{i: "a", x: 0, y: 0, w: 1, h: 1}, {i: "b", x: 0, y: 1, w: 1, h: 1}, {i: "c", x: 0, y: 2, w: 1, h: 1}, {
      i: "d",
      x: 0,
      y: 3,
      w: 1,
      h: 1
    },]
  };

  const [layouts, setLayouts] = useState(null);
  const [loadedLayout, setLoadedLayout] = useState(false);
  useEffect(() => {
    const storedLayout = localStorage.getItem("layouts");
    if (storedLayout) {
      setLayouts(JSON.parse(storedLayout));
      setLoadedLayout(true)
    } else {
      setLayouts(defaultLayouts);
      localStorage.setItem("layouts", JSON.stringify(defaultLayouts));
      setLoadedLayout(true)
    }
  }, []);

  useEffect(() => {
    loadedLayout && localStorage.setItem("layouts", JSON.stringify(layouts));
  }, [layouts]);

  return (<>
    {layouts && <ResponsiveGridLayout
      layouts={layouts}
      breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480}}
      cols={{lg: 5, md: 4, sm: 2, xs: 1}}
      rowHeight={300}
      isResizable={true}
      compactType="vertical"
      preventCollision={false}
      isDraggable={settings.draggableTiles}
      resizeHandles={["se", 'sw']}
      onLayoutChange={(layout, layouts) => setLayouts(layouts)}
    >
      <div key='a' className={styles.draggable}>
        <FavoritesPanel color={settings.favoritesColor}/>
      </div>

      <div key="b" className={styles.draggable}>
        <EmailsPanel color={settings.emailsColor}/>
      </div>

      <div key="c" className={styles.draggable}>
        <TaskPanel color={settings.todoColor}/>
      </div>

      <div key="d" className={styles.draggable}>
        <NotesPanel color={settings.notesColor}/>
      </div>
    </ResponsiveGridLayout>}
  </>);
};

export default TileLayout;
