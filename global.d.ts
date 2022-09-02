// import type { EventEmitter } from "events";
import mongoose from "mongoose";

declare global {
	var mongoose: {
		conn: Promise<typeof mongoose> | null;
		promise: ReturnType<typeof mongoose> | null;
	};
}
