using EKrumynas.Models.Middleware;

namespace EKrumynas.Middleware
{
	public interface IActivityLogger
	{
		void Log(ActivityRecord activityRecord);
	}
}
