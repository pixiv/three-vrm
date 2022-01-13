/// <reference types="node" />
import { ListrError, ListrRendererFactory, ListrSubClassOptions, ListrTask, ListrTaskWrapper, StateConstants, ListrBaseClassOptions, ListrTaskObject } from '../interfaces/listr.interface';
import { Task } from './task';
import { Listr } from '../index';
import { PromptOptions } from '../utils/prompt.interface';
export declare class TaskWrapper<Ctx, Renderer extends ListrRendererFactory> implements ListrTaskWrapper<Ctx, Renderer> {
    task: Task<Ctx, ListrRendererFactory>;
    errors: ListrError[];
    private options;
    constructor(task: Task<Ctx, ListrRendererFactory>, errors: ListrError[], options: ListrBaseClassOptions<Ctx, any, any>);
    set title(data: string);
    get title(): string;
    set output(data: string);
    get output(): string;
    set state(data: StateConstants);
    set message(data: ListrTaskObject<Ctx, Renderer>['message']);
    newListr(task: ListrTask<Ctx, Renderer> | ListrTask<Ctx, Renderer>[] | ((parent: this) => ListrTask<Ctx, Renderer> | ListrTask<Ctx, Renderer>[]), options?: ListrSubClassOptions<Ctx, Renderer>): Listr<Ctx, any, any>;
    report(error: Error | ListrError): void;
    skip(message: string): void;
    prompt<T = any>(options: PromptOptions | PromptOptions<true>[]): Promise<T>;
    stdout(): NodeJS.WriteStream & NodeJS.WritableStream;
    run(ctx: Ctx): Promise<void>;
}
