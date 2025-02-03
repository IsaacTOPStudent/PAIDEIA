export const ITEM_PER_PAGE =7

type RouteAccessMap = {
    [key: string]: string[];
};
export const routeAccessMap: RouteAccessMap = {
    "/admin(.*)": ["admin"],
    "/student(.*)": ["student"],
    "/teacher(.*)": ["teacher"],
    "/psychologist(.*)": ["psychologist"],
    "/parent(.*)": ["parent"],
    "/list/teachers": ["admin", "teacher", "psychologist"],
    "/list/students": ["admin", "teacher", "psychologist"],
    "/list/parents": ["admin", "teacher"],
    "/list/reports": ["admin", "psychologist", "teacher"],
    "/list/subjects": ["admin"],
    "/list/classes": ["admin", "teacher"],
    "/list/exams": ["admin", "teacher", "student", "parent"],
    "/list/assignments": ["admin", "teacher", "student", "parent"],
    "/list/results": ["admin", "teacher", "student", "parent"],
    "/list/attendance": ["admin", "teacher", "student", "parent", "psychologist"],
    "/list/events": ["admin", "teacher", "student", "parent", "psychologist"],
    "/list/announcements": ["admin", "teacher", "student", "parent", "psychologist"],
  };
