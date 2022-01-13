"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const rxjs_1 = require("rxjs");
const stream_1 = require("stream");
const listr_interface_1 = require("../interfaces/listr.interface");
const state_constants_1 = require("../interfaces/state.constants");
const index_1 = require("../index");
const renderer_1 = require("../utils/renderer");
const uuid_1 = require("../utils/uuid");
class Task extends rxjs_1.Subject {
    constructor(listr, tasks, options, rendererOptions) {
        var _a, _b, _c;
        super();
        this.listr = listr;
        this.tasks = tasks;
        this.options = options;
        this.rendererOptions = rendererOptions;
        this.message = {};
        this.id = uuid_1.generateUUID();
        this.title = (_a = this.tasks) === null || _a === void 0 ? void 0 : _a.title;
        this.cleanTitle = this.title;
        this.task = this.tasks.task;
        this.skip = ((_b = this.tasks) === null || _b === void 0 ? void 0 : _b.skip) || (() => false);
        this.enabledFn = ((_c = this.tasks) === null || _c === void 0 ? void 0 : _c.enabled) || (() => true);
        this.rendererTaskOptions = this.tasks.options;
        this.renderHook$ = this.listr.renderHook$;
        this.subscribe(() => {
            this.renderHook$.next();
        });
    }
    set state$(state) {
        this.state = state;
        this.next({
            type: 'STATE',
            data: state
        });
    }
    set output$(data) {
        this.output = data;
        this.next({
            type: 'DATA',
            data
        });
    }
    set message$(data) {
        this.message = { ...this.message, ...data };
        this.next({
            type: 'MESSAGE',
            data
        });
    }
    set title$(title) {
        this.title = title;
        this.cleanTitle = title;
        this.next({
            type: 'TITLE',
            data: title
        });
    }
    async check(ctx) {
        if (this.state === undefined) {
            if (typeof this.enabledFn === 'function') {
                this.enabled = await this.enabledFn(ctx);
            }
            else {
                this.enabled = this.enabledFn;
            }
            this.next({
                type: 'ENABLED',
                data: this.enabled
            });
        }
    }
    hasSubtasks() {
        var _a;
        return ((_a = this.subtasks) === null || _a === void 0 ? void 0 : _a.length) > 0;
    }
    isPending() {
        return this.state === state_constants_1.stateConstants.PENDING;
    }
    isSkipped() {
        return this.state === state_constants_1.stateConstants.SKIPPED;
    }
    isCompleted() {
        return this.state === state_constants_1.stateConstants.COMPLETED;
    }
    hasFailed() {
        return this.state === state_constants_1.stateConstants.FAILED;
    }
    isEnabled() {
        return this.enabled;
    }
    hasTitle() {
        return typeof (this === null || this === void 0 ? void 0 : this.title) === 'string';
    }
    isPrompt() {
        if (this.prompt) {
            return true;
        }
        else {
            return false;
        }
    }
    async run(context, wrapper) {
        const handleResult = (result) => {
            if (result instanceof index_1.Listr) {
                result.options = { ...this.options, ...result.options };
                const rendererClass = renderer_1.getRenderer('silent');
                result.rendererClass = rendererClass.renderer;
                result.renderHook$.subscribe(() => {
                    this.renderHook$.next();
                });
                this.subtasks = result.tasks;
                this.next({ type: 'SUBTASK' });
                result = result.run(context);
            }
            else if (this.isPrompt()) {
            }
            else if (result instanceof Promise) {
                result = result.then(handleResult);
            }
            else if (result instanceof stream_1.Readable) {
                result = new Promise((resolve, reject) => {
                    result.on('data', (data) => {
                        this.output$ = data.toString();
                    });
                    result.on('error', (error) => reject(error));
                    result.on('end', () => resolve());
                });
            }
            else if (result instanceof rxjs_1.Observable) {
                result = new Promise((resolve, reject) => {
                    result.subscribe({
                        next: (data) => {
                            this.output$ = data;
                        },
                        error: reject,
                        complete: resolve
                    });
                });
            }
            return result;
        };
        const startTime = Date.now();
        this.state$ = state_constants_1.stateConstants.PENDING;
        let skipped;
        if (typeof this.skip === 'function') {
            skipped = await this.skip(context);
        }
        if (skipped) {
            if (typeof skipped === 'string') {
                this.message$ = { skip: skipped };
            }
            else if (this.hasTitle()) {
                this.message$ = { skip: this.title };
            }
            else {
                this.message$ = { skip: 'Skipped task without a title.' };
            }
            this.state$ = state_constants_1.stateConstants.SKIPPED;
            return;
        }
        try {
            await handleResult(this.task(context, wrapper));
            if (this.isPending()) {
                this.message$ = { duration: Date.now() - startTime };
                this.state$ = state_constants_1.stateConstants.COMPLETED;
            }
        }
        catch (error) {
            this.state$ = state_constants_1.stateConstants.FAILED;
            if (this.prompt instanceof listr_interface_1.PromptError) {
                error = new Error(this.prompt.message);
            }
            if (error instanceof listr_interface_1.ListrError) {
                wrapper.report(error);
                return;
            }
            if (!this.hasSubtasks()) {
                this.title = error.message;
            }
            wrapper.report(error);
            if (this.listr.options.exitOnError !== false) {
                throw error;
            }
        }
        finally {
            this.complete();
        }
    }
}
exports.Task = Task;
//# sourceMappingURL=task.js.map