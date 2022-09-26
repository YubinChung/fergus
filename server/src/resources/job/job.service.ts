import JobModel from "@/resource/job/job.model";
import Job from '@/resource/job/job.interface';

class JobService {
  private job = JobModel;
  
  /**
   * Create a new job
   */
  public async create(name: string, status: string, title: string, phone: string, email: string, note: string): Promise<Job> {
    try {
      return this.job.create({name, status, title, phone, email, note});
    } catch (e) {
      throw new Error('Unable to create job');
    }
  }

  /**
   * Get all jobs
   */
  public async getAllJobs(): Promise<Job[] | null> {
    try {
      const job = await this.job.find();
      return job;
    } catch(e) {
      throw new Error('Job not found')
    }
  }

  /**
   * Find job by ID
   */
  public async findById(id: string): Promise<Job | null> {
    try {
      const job = await this.job.findById({_id: id});
      return job;
    } catch(e) {
      throw new Error('Job not found')
    }
  }

  public async update(id: string, name: string, status: string, title: string, phone: string, email: string, note: string): Promise<Job | null> {
    try {
      const job = await this.job.updateOne({_id: id}, {name, status, title, phone, email, note});
      return this.findById(id);
    } catch (e) {
      throw new Error('Unable to update job');
    }
  }

  public async delete(id: string): Promise<string> {
    return await this.job.deleteOne({_id: id}).then(() => `The job ${id} has been removed`);
  }
}

export default JobService;